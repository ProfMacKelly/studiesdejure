---
title: About
---
# Icons
## Icons/Emojis

[Icon/Emoji search](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/#search)

## Icons with Color
[with color](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/#with-colors")

## Icons with Animations
[with animations](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/#with-animations)

## Admonitions

### Admonition with Icon

!!! note

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

### Admonition with Customized Title
!!! note "Phasellus posuere in sem ut cursus"

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

### Nested Admonition
!!! note "Outer Note"

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

    !!! note "Inner Note"

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
        nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
        massa, nec semper lorem quam in massa.
### Removing Admonition Title (only outline of box)
!!! note ""

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
### Collapsible Block Admonitions
#### Collapsible: Initially Collapsed
??? note

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
#### Collapsible: Initially Expanded
???+ note

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
### Custom Admonition
!!! pied-piper "Pied Piper"

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
    euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
    purus auctor massa, nec semper lorem quam in massa.

## Annotations

### Basic
Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
{ .annotate }

1.  :man_raising_hand: I'm an annotation! I can contain `code`, __formatted
    text__, images, ... basically anything that can be expressed in Markdown.

### Nested Annotations
Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
{ .annotate }

1.  :man_raising_hand: I'm an annotation! (1)
    { .annotate }

    1.  :woman_raising_hand: I'm an annotation as well!



### Within Admonitions
!!! tip annotate "Phasellus posuere in sem ut cursus (1)"

    Lorem ipsum dolor sit amet, (2) consectetur adipiscing elit. Nulla et
    euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
    purus auctor massa, nec semper lorem quam in massa.

1.  :man_raising_hand: I'm an annotation!
2.  :woman_raising_hand: I'm an annotation as well!

### Within Content Tabs

=== "Tab 1"

    Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
    { .annotate }

    1.  :man_raising_hand: I'm an annotation!

=== "Tab 2"

    Phasellus posuere in sem ut cursus (1)
    { .annotate }

    1.  :woman_raising_hand: I'm an annotation as well!

### HTML with Annotations (just an example)
<div class="annotate" markdown>

> Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.

</div>

1.  :man_raising_hand: I'm an annotation!

## Footnotes
### Text with Footnotes
Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]

## Content Tabs
### Basic

=== "Unordered list"

    * Sed sagittis eleifend rutrum
    * Donec vitae suscipit est
    * Nulla tempor lobortis orci

=== "Ordered list"

    1. Sed sagittis eleifend rutrum
    2. Donec vitae suscipit est
    3. Nulla tempor lobortis orci

### Embedded Content: Content Tabs in Admonition

!!! example

    === "Unordered List"

        ``` markdown
        * Sed sagittis eleifend rutrum
        * Donec vitae suscipit est
        * Nulla tempor lobortis orci
        ```

    === "Ordered List"

        ``` markdown
        1. Sed sagittis eleifend rutrum
        2. Donec vitae suscipit est
        3. Nulla tempor lobortis orci
        ```
## Basic Tooltips/Abbreviations 
Text with tooltips/abbreviations
The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium
### Other Usage
#### Link with tooltip, inline syntax
[Hover me](https://www.google.com "I'm a tooltip!")

#### Link with tooltip, reference syntax
[Hover me][example]

  [example]: https://www.google.com "I'm a tooltip!"

### Icon with tooltip
:material-information-outline:{ title="Important information" }

## Buttons
[Adding buttons](https://squidfunk.github.io/mkdocs-material/reference/buttons/#adding-buttons)


## Grids

[See the guide](https://squidfunk.github.io/mkdocs-material/reference/grids/#usage")

## Tables
See [Using data tables](https://squidfunk.github.io/mkdocs-material/reference/data-tables/#usage)
See also [Column alignment](https://squidfunk.github.io/mkdocs-material/reference/data-tables/#column-alignment)

## Glossary
*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium
### Terms in Text
HTML
W3C

Note about glossary <u>when a glossary is in a separate file</u>: When using a dedicated file outside of the docs folder, add the parent directory to the list of watch folders so that when the glossary file is updated, the project is automatically reloaded when running mkdocs serve.

## Definition Lists
[Using definition list](https://squidfunk.github.io/mkdocs-material/reference/lists/#using-definition-lists)

## Footnote Section
[^1]: (Short footnote inline) Lorem ipsum dolor sit amet, consectetur adipiscing elit.
[^2]:
    (Paragraph footntote--see this is a new line) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

## Images
![book with scaled of justice on the cover](img/favicon.png){align=left width=90}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.

### Image Alignment
[alignment](https://squidfunk.github.io/mkdocs-material/reference/images/#image-alignment)

### Image Lazy Loading
[lazy loading](https://squidfunk.github.io/mkdocs-material/reference/images/#image-lazy-loading)

### Image with Caption
![book with scaled of justice on the cover](img/favicon.png){width=90}
/// caption
caption
///

### Image Lazy-Loading
![book with scaled of justice on the cover](img/favicon.png){width=90}
