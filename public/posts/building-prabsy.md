# Building Prabsy
## The Beginning

So, I started building Prabsy as a personal toolkit project.

The idea was simple. I wanted a place where I could keep small tools that I actually use while working on frontend, images, screenshots, UI, and design related tasks.

I did not want it to be just another landing page project. I wanted it to have real tools inside it. Something I could open and use when I need to edit an image, mark something in a screenshot, check an image, or do small visual tasks faster.

At first the project looked simple from outside. A website with some tools. But once I started building the actual tools, I realized there were many small technical parts inside it.

## Image Markup Studio

The first main tool I worked on was Image Markup Studio.

This became one of the bigger parts of Prabsy because it is not just a normal image preview page. It has an actual image editor kind of flow.

The user can upload or paste an image, then work on it inside the canvas. I had to think about the editing area, image scaling, resizing, export, copy image, download, and how the image should look in preview versus final output.

There were also many small UI issues in this tool.

Sometimes the preview looked correct but the exported image was different. Sometimes the text wrapped in export but not in the actual preview. Sometimes the uploaded image worked differently from the default image. These kinds of issues were annoying because the UI looked fine but the actual output was not matching.

So this tool took more work than it looked from outside.

It made me understand that an image tool is not only about showing an image on screen. The real work is making sure the image, canvas, export size, text, layout, and browser rendering all match properly.

## AI or Not

Another tool I worked on was AI or Not.

This one was also interesting because it needed more than just a simple upload and result screen. I wanted it to show a proper breakdown instead of only saying “AI” or “Not AI”.

So the tool checks different signals and gives a more detailed result. Things like metadata, compression, provenance, image type, face related signals, edge patterns, lighting, background, watermark, upscale signs, and other small indicators.

The hard part was not only showing a percentage. The harder part was making the result feel understandable.

For example, if the tool says an image is 48% AI-like, the user should have some idea why it got that score. So I worked on result cards, signal scores, weights, and explanations for what each part means.

There were also classification issues. One image could get detected as the wrong type, like a portrait being treated as a screenshot or UI image. So I had to think about how the detection logic should work better, especially when a face is present.

This tool made me think more about scoring systems and how the UI should explain technical results without making it too confusing.

## Other Tools

After that, the plan was to keep adding more small tools around the same idea.

Not huge apps. Just useful focused tools.

Some tools can help with images. Some can help with frontend assets. Some can help with screenshots, colors, previews, resizing, or other daily UI work.

I wanted Prabsy to feel like a toolkit where each tool has one clear job.

That is also why I did not want the website to be only a pretty homepage. The actual value should come from the tools inside it.

## The Frontend Side

Since I mostly work on frontend, I also cared a lot about how the website felt.

I wanted the UI to be clean but not too basic. The layout had to feel proper, the cards had to look good, and the tools needed to be easy to use.

But while building it, I also noticed one thing again.

AI can generate frontend code fast, but the UI often looks very normal. It works, but it does not always feel designed.

So I had to keep improving the spacing, layout, dark mode, card design, button states, typography, and small interaction details myself.

That was also part of the project. Not only building the tools, but making them feel like they belong in one proper product.

## Reflections

Building Prabsy was a good experience because it was not just a static website.

It had actual logic, actual tools, and many small problems that only appear when you start using the tool yourself.

Image Markup Studio taught me a lot about image rendering, canvas behavior, export issues, and editor UI.

AI or Not made me think more about scoring, image signals, result explanation, and how to show technical data in a simple way.

The project is still something I can keep improving. I can add more tools, polish the existing ones, and make the whole toolkit more useful over time.

So yeah, this was the beginning of Prabsy.

A personal toolkit project that started simple, but slowly became a place where I could build and test useful frontend and image tools.

The END ! xD

© 2026 Prabin.