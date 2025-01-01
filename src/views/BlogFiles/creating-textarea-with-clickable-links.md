---
title: Creating a Textarea with Clickable Links in React with Linkify
date: 2024/12/23
---

## Introduction

Ever needed to create a textarea where URLs automatically become clickable without losing the ability to edit the text? In this blog, I'll tell you how to build
a custom textarea component in React that combines the power of `linkifyjs` with a clever mirroring technique to achieve this functionality.

## Technical Overview

Our solution leverages three key technologies:

- React Hooks for state management and lifecycle events
- DOM manipulation for creating and syncing a mirrored element
- ResizeObserver for maintaining proper dimensions
- Linkify.js for URL detection and formatting

## Implementation Deep Dive

### 1. Basic Component Structure

Let's start with the foundation of our component:

```jsx
import React, { useEffect, useState } from "react";
import { linkifyStr } from "linkifyjs";

const CustomTextArea = ({ text, onChange }) => {
  const [inputValue, setInputValue] = useState(text);

  useEffect(() => {
    setInputValue(text);
  }, [text]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return <textarea value={inputValue} onChange={handleChange} />;
};
```

### 2. Creating the Mirror Element

The key to our implementation is a mirrored element that overlays the textarea:

```jsx
useEffect(() => {
  const containerEle = document.getElementById("container");
  const textarea = document.getElementById("textarea");

  const mirroredEle = document.createElement("div");
  mirroredEle.classList.add("container__mirror");
  mirroredEle.id = "mirror";
  containerEle.appendChild(mirroredEle);

  return () => {
    containerEle.removeChild(mirroredEle);
  };
}, []);
```

### 3. Synchronizing Styles

To ensure perfect alignment, we copy essential styles from the textarea to the mirror:

```jsx
useEffect(() => {
  const textarea = document.getElementById("textarea");
  const mirroredEle = document.getElementById("mirror");

  const textareaStyles = window.getComputedStyle(textarea);
  ["fontFamily", "fontSize", "lineHeight", "padding"].forEach((property) => {
    mirroredEle.style[property] = textareaStyles[property];
  });

  mirroredEle.textContent = textarea.value;
}, []);
```

### 4. Implementing Linkify

Here's how we convert URLs into clickable links:

```jsx
const updateLinks = (text) => {
  const mirroredEle = document.getElementById("mirror");
  mirroredEle.innerHTML = linkifyStr(text, { target: "_blank" });
};

useEffect(() => {
  const textarea = document.getElementById("textarea");

  textarea.addEventListener("input", () => {
    updateLinks(textarea.value);
  });

  updateLinks(textarea.value);
}, []);
```

### 5. Essential Styling

The SCSS that makes it all work:

```scss
.ai_text_container {
  position: relative; // This is crucial for positioning our mirror

  .container__textarea {
    color: transparent; // Hide the actual text
    caret-color: black; // But keep the cursor visible!
    width: 100%;
    min-height: 100px;
    resize: vertical; // Allow vertical resizing

    &::placeholder {
      color: #757575; // Keep placeholder visible
    }
  }

  .container__mirror {
    position: absolute;
    top: 0;
    left: 0;
    user-select: none; // Prevent text selection in mirror
    pointer-events: none; // Let clicks pass through to textarea
    width: 100%;
    height: 100%;
    white-space: pre-wrap; // Preserve whitespace and wrapping

    // But make links clickable!
    a {
      color: #0066cc;
      text-decoration: underline;
      pointer-events: auto; // Override parent to make links clickable

      &:hover {
        text-decoration: none;
      }
    }
  }
}
```

### 6. Complete Implementation

Here's the full component code that brings everything together:

```jsx
import React, { useEffect, useState } from "react";
import { linkifyStr } from "linkifyjs";

const CustomTextArea = ({ text, onChange }) => {
  // Track the input value in state
  const [inputValue, setInputValue] = useState(text);

  // Update internal state when prop changes
  useEffect(() => {
    setInputValue(text);
    // Also update our mirror if it exists
    const mirroredEle = document.getElementById("mirror");
    if (mirroredEle) {
      mirroredEle.innerHTML = linkifyStr(text, {
        target: "_blank", // Open links in new tab
      });
    }
  }, [text]);

  // Handle user input changes
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue); // Notify parent component
  };

  // Set up our mirror element and keep it in sync
  useEffect(() => {
    // Get our container and textarea elements
    const containerEle = document.getElementById("container");
    const textarea = document.getElementById("textarea");

    // Create our mirror element that will show the links
    const mirroredEle = document.createElement("div");
    mirroredEle.classList.add("container__mirror");
    mirroredEle.id = "mirror";
    containerEle.appendChild(mirroredEle);

    // Copy essential styles from textarea to mirror
    // This ensures our mirror looks exactly like the textarea
    const textareaStyles = window.getComputedStyle(textarea);
    ["fontFamily", "fontSize", "lineHeight", "padding"].forEach((property) => {
      mirroredEle.style[property] = textareaStyles[property];
    });

    // Set up resize observer to keep mirror sized correctly
    const ro = new ResizeObserver(() => {
      // Update mirror dimensions when textarea size changes
      mirroredEle.style.width = `${textarea.clientWidth}px`;
      mirroredEle.style.height = `${textarea.clientHeight}px`;
    });
    ro.observe(textarea);

    // Update mirror content whenever user types
    textarea.addEventListener("input", () => {
      mirroredEle.innerHTML = linkifyStr(textarea.value, {
        target: "_blank",
      });
    });

    // Clean up on component unmount
    return () => {
      ro.disconnect();
      containerEle.removeChild(mirroredEle);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div id="container" className="ai_text_container">
      <textarea id="textarea" className="container__textarea" value={inputValue} onChange={handleChange} />
    </div>
  );
};
```

## How It Works

1. **The Mirror Technique**: We create a transparent textarea with a visible caret, overlaid by a div that displays the same text with clickable links.

2. **Style Synchronization**: The mirror element copies essential styles from the textarea to maintain perfect alignment.

3. **Dynamic Updates**: As the user types, the mirror content updates in real-time, maintaining the clickable links.

4. **Resize Handling**: A ResizeObserver ensures the mirror stays perfectly aligned when the textarea is resized.

## Key Considerations

1. **Performance**

   - The mirror element updates efficiently on each input change
   - Style synchronization happens only once during initialization
   - ResizeObserver provides smooth resize handling

2. **Usability**

   - Users can edit text naturally while seeing clickable links
   - The caret remains visible and properly positioned
   - Links are clickable without interfering with text editing

3. **Maintenance**
   - Clear separation of concerns between text editing and link display
   - Cleanup on unmount prevents memory leaks
   - Modular structure makes updates and extensions easy

## Potential Enhancements

1. Add support for custom link styling
2. Implement link validation
3. Add custom link click handlers
4. Support for different link types (email, phone numbers, etc.)

## Conclusion

This implementation provides a clean solution for adding clickable links to a textarea while maintaining its core functionality. The mirroring technique,
combined with linkify.js, creates a seamless user experience that's both practical and maintainable.

The component can be easily integrated into any React application and customized to match specific requirements. Whether you're building a chat application,
comment system, or any other text input that needs clickable links, this approach provides a solid foundation.

Happy coding!

---

**Additional Resources**

- [Linkify.js Documentation](https://linkify.js.org/)
- [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
- [React DOM Manipulation](https://react.dev/learn/manipulating-the-dom-with-refs)
