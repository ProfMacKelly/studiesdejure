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


### Annotation Tooltip Width
See extra_css with this text:

:root {
  --md-tooltip-width: 600px;
}


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
[Hover me][https://www.google.com]

  [https://www.google.com]: https://www.google.com "I'm a tooltip!"

### Icon with tooltip
:material-information-outline:{ title="Important information" }

## Lists
### Ordered Lists
1.  Vivamus id mi enim. Integer id turpis sapien. Ut condimentum lobortis
    sagittis. Aliquam purus tellus, faucibus eget urna at, iaculis venenatis
    nulla. Vivamus a pharetra leo.

    1.  Vivamus venenatis porttitor tortor sit amet rutrum. Pellentesque aliquet
        quam enim, eu volutpat urna rutrum a. Nam vehicula nunc mauris, a
        ultricies libero efficitur sed.

    2.  Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet
        rutrum. Pellentesque aliquet quam enim, eu volutpat urna rutrum a.

        1.  Mauris dictum mi lacus
        2.  Ut sit amet placerat ante
        3.  Suspendisse ac eros arcu

### Unordered Lists
- Nulla et rhoncus turpis. Mauris ultricies elementum leo. Duis efficitur
  accumsan nibh eu mattis. Vivamus tempus velit eros, porttitor placerat nibh
  lacinia sed. Aenean in finibus diam.

    * Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
    * Nam vulputate tincidunt fringilla.
    * Nullam dignissim ultrices urna non auctor.

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
Do you like chicken? That depends on the totality of the circumstances.

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
![book with scaled of justice on the cover](images/book-scales.png){align=left width=90}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.

### Image Alignment
[alignment](https://squidfunk.github.io/mkdocs-material/reference/images/#image-alignment)

### Image Lazy Loading
[lazy loading](https://squidfunk.github.io/mkdocs-material/reference/images/#image-lazy-loading)

### Image with Caption
![book with scaled of justice on the cover](images/book-scales.png){width=90}
/// caption
caption
///

### Image Lazy-Loading
![book with scaled of justice on the cover](images/book-scales.png){width=90}

## Colors
### Custom Colors
in mkdocs yml, change the theme's palette for "primary" an/dor "accent" to custom. If you do this, add this to the extra.css (changing the preferred colors)

:root  > * {
  --md-primary-fg-color:        #EE0F0F;
  --md-primary-fg-color--light: #ECB7B7;
  --md-primary-fg-color--dark:  #90030C;
}
Also, see [color definitions](https://github.com/squidfunk/mkdocs-material/blob/master/src/templates/assets/stylesheets/main/_colors.scss).

### Custom Color Scheme
in mkdocs yml, change the theme's palette for "scheme" to "customschemename." If you do this, add this to the extra.css (changing the preferred colors)

[data-md-color-scheme="customschemename"] {
  --md-primary-fg-color:        #EE0F0F;
  --md-primary-fg-color--light: #ECB7B7;
  --md-primary-fg-color--dark:  #90030C;
}

### Color Scheme for Slate
[data-md-color-scheme="slate"] {
  --md-hue: 210; 
}

## Buttons
### Button (Outlined/Basic)
[Subscribe to our newsletter](https://www.google.com){ .md-button }

### Button (Filled/"Primary")
[Subscribe to our newsletter](#){ .md-button .md-button--primary }

### Button with Icon
[Send :fontawesome-solid-paper-plane:](https://www.google.com){ .md-button }

## Cards/Grids
### Example 1
<div class="grid cards" markdown>

- :fontawesome-brands-html5: __HTML__ for content and structure
- :fontawesome-brands-js: __JavaScript__ for interactivity
- :fontawesome-brands-css3: __CSS__ for text running out of boxes
- :fontawesome-brands-internet-explorer: __Internet Explorer__ ... huh?

</div>

### Example 2
<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Set up in 5 minutes__

    ---

    Install [`mkdocs-material`](https://www.google.com) with [`pip`](https://www.google.com) and get up
    and running in minutes

    [:octicons-arrow-right-24: Getting started](https://www.google.com)

-   :fontawesome-brands-markdown:{ .lg .middle } __It's just Markdown__

    ---

    Focus on your content and generate a responsive and searchable static site

    [:octicons-arrow-right-24: Reference](https://www.google.com)

-   :material-format-font:{ .lg .middle } __Made to measure__

    ---

    Change the colors, fonts, language, icons, logo and more with a few lines

    [:octicons-arrow-right-24: Customization](https://www.google.com)

-   :material-scale-balance:{ .lg .middle } __Open Source, MIT__

    ---

    Material for MkDocs is licensed under MIT and available on [GitHub]

    [:octicons-arrow-right-24: License](https://www.google.com)

</div>

## Flowcharts & Diagrams
### Flowcharts
``` mermaid
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> B;
  B ---->|No| E[Yay!];
```
### Sequence Diagrams

#### Simple Example
``` mermaid
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice->>John: See you later!
```
#### Complex Example
``` mermaid
sequenceDiagram
  autonumber
  Alice->>John: Hello John, how are you?
  loop Healthcheck
      John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!
```
### State Diagrams
``` mermaid
stateDiagram-v2
  state fork_state <<fork>>
    [*] --> fork_state
    fork_state --> State2
    fork_state --> State3

    state join_state <<join>>
    State2 --> join_state
    State3 --> join_state
    join_state --> State4
    State4 --> [*]
```
### Class Diagrams
``` mermaid
classDiagram
  Person <|-- Student
  Person <|-- Professor
  Person : +String name
  Person : +String phoneNumber
  Person : +String emailAddress
  Person: +purchaseParkingPass()
  Address "1" <-- "0..1" Person:lives at
  class Student{
    +int studentNumber
    +int averageMark
    +isEligibleToEnrol()
    +getSeminarsTaken()
  }
  class Professor{
    +int salary
  }
  class Address{
    +String street
    +String city
    +String state
    +int postalCode
    +String country
    -validate()
    +outputAsLabel()  
  }
```

### Other Diagrams
[Other Diagrams](https://squidfunk.github.io/mkdocs-material/reference/diagrams/#other-diagram-types)

## Instant Preview Link
``` markdown
[Attribute Lists](#){ data-preview }
```
