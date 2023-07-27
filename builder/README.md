# Installation

1. Add the `package name` package

```bash
# yarn
yarn add package name

# npm
npm install package name --save
```

2. Use the package

```js
import {DNDBuilder} from "package name";

new DNDBuilder({
    dropContainer: 'dropzone',
    dropIndicator: 'drop-here-indicator'
})
```

3. Profit 🕺


```html

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>


<!--mandatory wrapper with is "app" id-->
<div id="app">
    <!--mandatory wrapper with is "layout" id-->
    <div id="layout">
        <!--Left sidebar-->
        <!--target elements with the "draggable" class-->
        <div class="components_contain" ></div>
        
        <!--Content-->
        <!--// only accept elements matching this CSS selectors-->
        <!--// enable draggables to be dropped into this-->
        <div id="drop-here-indicator"></div>
        <div id="dropzone" class="dropzone"></div>
        
        <!--Right Sidebar-->
        <!--Editable elements-->
        <div id="builder-props-title"></div>
        <div id="builder-props-content"></div>
        <div id="builder-props-attribute"></div>
        <div id="builder-style-content"></div>
        <div id="builder-class-content"></div>
        <div id="builder-class-list"></div>
        <p class="tabPageName"></p>
        <input class="form-control text-left global-set" id="page_title" placeholder="Page Title" />
        <input class="form-control text-left global-set" id="seo_description" placeholder="SEO description" />
        <input class="form-control text-left global-set" id="seo_keyword" placeholder="SEO Keywords" />
        <input class="form-control text-left global-set" id="external_js_url" placeholder="EXTERNAL JS URL" />
        <input class="form-control text-left global-set" id="external_css_url" placeholder="EXTERNAL CSS URL" />
    </div>
</div>




```


