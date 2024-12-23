---
title: Creating a Textarea with Clickable Links in React with Linkify
date: 2024-12-23
---

In this blog, I’ll walk you through how I created a custom textarea component in React that dynamically converts URLs into clickable links. This functionality
can be incredibly useful for any text-based input that needs enhanced interactivity, such as comment sections or messaging platforms.

## Overview

To achieve this, we’ll combine the power of:

- **React Hooks**: For managing state and lifecycle events.
- **DOM Manipulation**: To synchronize the textarea content with a styled "mirror" element.
- **ResizeObserver**: For dynamically adjusting the mirror size to match the textarea.
- **CSS Styling**: To ensure a seamless user experience with clickable links that don’t interfere with typing.

The result? A user-friendly component that maintains the editable nature of a textarea while allowing links to remain interactive and visually distinct.

## Step-by-Step Walkthrough

### 1. Setting Up the State and Props

First, we need a `ViewContent` component that accepts two props: `text` and `onChange`. The `text` prop initializes the textarea content, while the `onChange`
function updates the parent state whenever the content changes. We’ll manage the component’s state using React’s `useState` hook:

```jsx
const ViewContent = ({ text, onChange }) => {
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

This sets up a functional, interactive textarea that updates as the user types.

### 2. Adding a Mirror Element

The key to our clickable links lies in a "mirror" element—a visually styled div that overlays the textarea. This mirror will display linked text while staying
in sync with the textarea content.

We’ll dynamically create and clean up the mirror element in a `useEffect` hook:

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

This ensures the mirror element is created when the component mounts and removed when it unmounts.

### 3. Syncing Styles and Content

For the mirror to align perfectly with the textarea, we’ll copy its computed styles. This includes properties like font size, padding, and line height:

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

This step ensures that the mirror matches the textarea’s dimensions and appearance.

### 4. Handling Dynamic Updates and Links

To convert URLs into clickable links, we’ll use the `linkifyStr` function from the `linkifyjs` library. This parses the textarea content and wraps URLs in `<a>`
tags:

```jsx
import { linkifyStr } from "linkifyjs";

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

This ensures that as the user types, the mirror updates dynamically, converting any URLs into clickable links.

### 5. Final Integration

Now, let’s bring everything together. Our component includes the textarea and its mirrored counterpart, styled to overlap seamlessly:

```jsx
return (
  <div id="container" className="ai_text_container">
    <textarea id="textarea" className="container__textarea" value={inputValue} onChange={handleChange} />
  </div>
);
```

### SCSS Styling

The following styles ensure the textarea is transparent while the mirror is visible and interactive:

```scss
.ai_text_container {
  position: relative;

  .container__textarea {
    color: transparent;
    caret-color: black;
  }

  .container__mirror {
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
    pointer-events: none;
  }

  .container__mirror a {
    pointer-events: auto;
  }
}
```

## Full Implementation

Here’s the complete code for the `ViewContent` component:

```jsx
import React, { useEffect, useState } from "react";
import { linkifyStr } from "linkifyjs";

const ViewContent = ({ text, onChange }) => {
  const [inputValue, setInputValue] = useState(text);

  useEffect(() => {
    setInputValue(text);
    const mirroredEle = document.getElementById("mirror");
    if (mirroredEle) {
      mirroredEle.innerHTML = linkifyStr(text, {
        target: "_blank",
      });
    }
  }, [text]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    const containerEle = document.getElementById("container");
    const textarea = document.getElementById("textarea");

    const mirroredEle = document.createElement("div");
    mirroredEle.classList.add("container__mirror");
    mirroredEle.id = "mirror";
    containerEle.appendChild(mirroredEle);

    const textareaStyles = window.getComputedStyle(textarea);
    ["fontFamily", "fontSize", "lineHeight", "padding"].forEach((property) => {
      mirroredEle.style[property] = textareaStyles[property];
    });

    const ro = new ResizeObserver(() => {
      mirroredEle.style.width = `${textarea.clientWidth}px`;
      mirroredEle.style.height = `${textarea.clientHeight}px`;
    });
    ro.observe(textarea);

    textarea.addEventListener("input", () => {
      mirroredEle.innerHTML = linkifyStr(textarea.value, {
        target: "_blank",
      });
    });
  }, []);

  return (
    <div id="container" className="ai_text_container">
      <textarea id="textarea" className="container__textarea" value={inputValue} onChange={handleChange}></textarea>
    </div>
  );
};

export default ViewContent;
```

## Conclusion

By combining React state management, DOM manipulation, and CSS, we created a dynamic textarea that preserves interactivity while making URLs clickable. This
approach is flexible, visually appealing, and functional—perfect for chat apps, comment sections, or any input field that benefits from clickable links.

Feel free to adapt and extend this implementation for your own projects. Happy coding!
