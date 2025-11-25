import { useEffect, useRef } from 'react';

export default function FloatingParticles() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 4 + 2;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.6 + 0.4;
            }
            update(mouse) {
                // Move particle
                this.x += this.speedX;
                this.y += this.speedY;

                // Mouse interaction - particles move away from cursor
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;
                }

                // Wrap around screen
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                // Create gradient for glow effect
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 4
                );
                gradient.addColorStop(0, `rgba(88, 166, 255, ${this.opacity})`);
                gradient.addColorStop(0.5, `rgba(88, 166, 255, ${this.opacity * 0.5})`);
                gradient.addColorStop(1, 'rgba(88, 166, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }

        // Star class for twinkling stars
        class Star {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.opacity = 0;
                this.fadeIn = true;
                this.fadeSpeed = Math.random() * 0.02 + 0.01;
                this.maxOpacity = Math.random() * 0.5 + 0.5;
                this.life = 0;
                this.maxLife = Math.random() * 100 + 50;
            }

            update() {
                this.life++;

                if (this.fadeIn) {
                    this.opacity += this.fadeSpeed;
                    if (this.opacity >= this.maxOpacity) {
                        this.fadeIn = false;
                    }
                } else {
                    this.opacity -= this.fadeSpeed * 0.5;
                }

                // Reset star when it fades out or reaches max life
                if (this.opacity <= 0 || this.life >= this.maxLife) {
                    this.reset();
                }
            }

            draw(ctx) {
                if (this.opacity <= 0) return;

                // Draw star with cross pattern
                ctx.save();
                ctx.translate(this.x, this.y);

                // Main glow
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 6);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
                gradient.addColorStop(0.3, `rgba(200, 220, 255, ${this.opacity * 0.6})`);
                gradient.addColorStop(1, 'rgba(88, 166, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(0, 0, this.size * 6, 0, Math.PI * 2);
                ctx.fill();

                // Bright center
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Star rays
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
                ctx.lineWidth = 1;

                // Horizontal ray
                ctx.beginPath();
                ctx.moveTo(-this.size * 3, 0);
                ctx.lineTo(this.size * 3, 0);
                ctx.stroke();

                // Vertical ray
                ctx.beginPath();
                ctx.moveTo(0, -this.size * 3);
                ctx.lineTo(0, this.size * 3);
                ctx.stroke();

                ctx.restore();
            }
        }

        // Create particles
        const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 120);
        particlesRef.current = Array.from({ length: particleCount }, () => new Particle());

        // Create stars
        const starCount = 15;
        const stars = Array.from({ length: starCount }, () => new Star());

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw and update stars first (background layer)
            stars.forEach(star => {
                star.update();
                star.draw(ctx);
            });

            // Draw particles
            particlesRef.current.forEach(particle => {
                particle.update(mouseRef.current);
                particle.draw(ctx);
            });

            // Draw connections between nearby particles
            particlesRef.current.forEach((particleA, indexA) => {
                particlesRef.current.slice(indexA + 1).forEach(particleB => {
                    const dx = particleA.x - particleB.x;
                    const dy = particleA.y - particleB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(88, 166, 255, ${0.3 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particleA.x, particleA.y);
                        ctx.lineTo(particleB.x, particleB.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 1 }}
        />
    );
}
