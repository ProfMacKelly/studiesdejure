
# Tools


## Icons/Emojis

[Icon/Emoji search](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/#search)

## Icons with Color
[with color](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/#with-colors")

## Icons with Animations
[with animations](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/#with-animations)

## Admonitions

### Admonition with Icon

NOTE: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.

### Admonition with Customized Title
NOTE: **Customized Title**
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.

> OBJECTIVES: **Learning Objectives.**
>
> * Explain the category of behavior defined as a crime.

> CLOSERLOOK: **Case in Point**
> xxx

> EXAMPLE: **Example**
> xxx

>INFO: **Sidebar**
> xxx

> KEY: **Key Takeaways**
> xxx

> VIDEO: **Watch and Learn**
> <div class="video-wrapper"><iframe width="660" height="371" src="https://www.youtube.com/embed/NsLfdHMTE7Y" title="The Common Law" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
>
><span class="caption-size">Source: *The Common Law* by [Moller|Law.](https://www.youtube.com/channel/UCciou6PfPPEH1q-lLZCza_A) (Learn how to access the [transcript.](https://ecampusontario.pressbooks.pub/3rdpartytoolsaccessibility/chapter/youtube-transcript-instructions/))</span>

> AUDIO: **Listen**
> xxx

> TIP:
> xxx

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

>? NOTE: 
>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.

??? note

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

#### Collapsible: Initially Expanded

>! NOTE: 
>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.

???+ note

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

#### Supplementary Attributions
>? SUPP: **Supplementary Attributions**
>Except where otherwise noted, this page's content is adapted from:    
>
>* [1.3: Modern Legal Systems of the World](https://biz.libretexts.org/@go/page/41994) by [Melissa Randall and Community College of Denver Students](https://www.ccd.edu/directory/melissa-randall/) is licensed [CC BY 4.0.](https://creativecommons.org/licenses/by/4.0/) [(Original source.)](https://introductiontobusinesslaw.pressbooks.com)
>
>* [legal systems.](https://www.law.cornell.edu/wex/legal_systems) [_Wex Legal Dictionary and Encyclopedia_](https://www.law.cornell.edu/wex) by Cornell University's [Legal Information Institute](https://about.law.cornell.edu/) is licensed [CC BY-NC-SA 2.5.](https://creativecommons.org/licenses/by-nc-sa/2.5/)
>
>* [Legal Training Handbook](https://www.fletc.gov/sites/default/files/st-1000-fy23-with-cover.pdf) (2023), §§ 18.1-18.2, 18.6-18.6.2, by [U.S. Dept. of Homeland Security Federal Law Enforcement Training Centers](https://www.fletc.gov/) Office of Chief Counsel, Amanda Barak & Lindsey Brower, Editors. This content page is in the [public domain.](https://www.law.cornell.edu/uscode/text/17/105)
>
>* [4.1: Investigative Detentions](https://workforce.libretexts.org/Bookshelves/Corrections/Principles_and_Procedures_of_the_Justice_System_\(Alvarez\)/04%3A_Detentions_Based_on_Reasonable_Suspicion/4.1%3A_Investigative_Detentions) by [Larry Alvarez](https://www.canyons.edu/directory/larry-alvarez.php), used under [CC BY 4.0.](https://creativecommons.org/licenses/by/4.0/) 

## Annotations
### Basic
Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
{ .annotate }

1.  I'm an annotation! I can contain `code`, __formatted
    text__, images, ... basically anything that can be expressed in Markdown.

### Nested Annotations
Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
{ .annotate }

1.  I'm an annotation! (1)
    { .annotate }

    1.  I'm an annotation as well!


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
![book with scales of justice on the cover](../.drafts/images/book-scales.png){align=left width=90} 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.

### Image Alignment
[alignment](https://squidfunk.github.io/mkdocs-material/reference/images/#image-alignment)

### Image Lazy Loading
[lazy loading](https://squidfunk.github.io/mkdocs-material/reference/images/#image-lazy-loading)

### Image with Caption
![book with scaled of justice on the cover](../.drafts/images/book-scales.png){width=90}
/// caption
<span class="caption-size"><strong>Figure x.x.x</strong> Title</span>
///


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

[![McDonnell Douglas Burden-Shifting Flowchart](https://mermaid.ink/img/pako:eNqVk1tv2jAUx7_KkatqLwElhHDxwyaawDRprap1Ly30wU2OwZpjI9spUMR3n0nCGvVh2vzkc_n9zzm-HEmuCySUcKl3-YYZBz-zlQK_Zst7yYRygvNPFu6NKBksWC4QUmbxGXq9z3BzvEV0FpiUgBJLVM5-OTX8jc-AO13nPS1Tr1V6Xkj73Ik_oq0T0uW83Ep9QAMz40ReSeZ8iMF3XAvnSzsMoOHutOplwua-IaGY0-YAP5BZrVrdtBbM3ruHh43eWXAbbBWadBDnqdDh3rVkVpPzY-v1Uf2K6jLPvNvvYvlNcTSocgTNodOP8Mo9eC_uxV47U887p_L1w6k0GdfX8OAOUqh1Y1tvIMyACynpFZ_ywDqjfyG9iuO43fd2onAbOtjuu0zaMi8v_85klzr_wSxahnH2V4YEZG1EQagzFQakRFOys0mOZ7UV8TdU4opQvy2Qs0q6FVmpk8e2TD1pXV5Io6v1hlDOpPVWtS3888gEWxtW_vH6uynQpLpSjtAomdQihB7JntDBOOkPk5H3jsaDKJz64IHQ4ag_CKM4jIbTaJKE0fgUkLe6atifRGGcxIPxNIri8WiaBAQL4d_ebfN76k90-g039AtM?type=png)](https://mermaid.live/edit#pako:eNqVk1tv2jAUx7_KkatqLwElhHDxwyaawDRprap1Ly30wU2OwZpjI9spUMR3n0nCGvVh2vzkc_n9zzm-HEmuCySUcKl3-YYZBz-zlQK_Zst7yYRygvNPFu6NKBksWC4QUmbxGXq9z3BzvEV0FpiUgBJLVM5-OTX8jc-AO13nPS1Tr1V6Xkj73Ik_oq0T0uW83Ep9QAMz40ReSeZ8iMF3XAvnSzsMoOHutOplwua-IaGY0-YAP5BZrVrdtBbM3ruHh43eWXAbbBWadBDnqdDh3rVkVpPzY-v1Uf2K6jLPvNvvYvlNcTSocgTNodOP8Mo9eC_uxV47U887p_L1w6k0GdfX8OAOUqh1Y1tvIMyACynpFZ_ywDqjfyG9iuO43fd2onAbOtjuu0zaMi8v_85klzr_wSxahnH2V4YEZG1EQagzFQakRFOys0mOZ7UV8TdU4opQvy2Qs0q6FVmpk8e2TD1pXV5Io6v1hlDOpPVWtS3888gEWxtW_vH6uynQpLpSjtAomdQihB7JntDBOOkPk5H3jsaDKJz64IHQ4ag_CKM4jIbTaJKE0fgUkLe6atifRGGcxIPxNIri8WiaBAQL4d_ebfN76k90-g039AtM)



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

## Hide/Ellide/Reveal Text
<p>
  This is a sentence that is <span class="hidden-text">initially hidden but will be revealed</span>
  <span class="ellipsis" onclick="toggleText(this)">...</span> clicking the arrow can hide it again.
</p>

## Video in Frame
***
!!! video "Watch & Learn"

<div class="video-wrapper"><iframe width="660" height="371" src="https://www.youtube.com/embed/5rT7G_11lSs" title="Reasonable Expectation of Privacy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>

<span class="caption-size">Source: *Reasonable Expectation of Privacy* by [LawShelf.](https://www.youtube.com/@LawShelf) (Learn how to access the [transcript.](https://ecampusontario.pressbooks.pub/3rdpartytoolsaccessibility/chapter/youtube-transcript-instructions/))</span>

***
Note: For LawShelf video transcript: (See the [transcript.](https://www.lawshelf.com/videos/entry/sources-of-law-in-the-united-states))

[**OR Try This Plugin**](https://pypi.org/project/mkdocs-video/#configuration)

> VIDEO: **Watch and Learn**
> <div class="video-wrapper"><iframe width="660" height="371" src="https://www.youtube.com/embed/y-rAjwNhp_8" title="Sources of Law in the United States" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
>
><span class="caption-size">Source: *Sources of Law in the United States* by [LawShelf.](https://www.youtube.com/@LawShelf) (Learn how to access the [transcript.](https://ecampusontario.pressbooks.pub/3rdpartytoolsaccessibility/chapter/youtube-transcript-instructions/))</span>


## Quizzes

Some **markdown** content.

:::{quizdown}

---
primaryColor: steelblue
shuffleQuestions: false
shuffleAnswers: true
---

# What is the capital of France?

> Paris is the capital and largest city of France.

1. [x] Paris
2. [ ] London
3. [ ] Berlin
4. [ ] Madrid

:::

Some **markdown** content.

***

# Overlay
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Link Preview Overlay</title>
    <link rel="stylesheet" href="stylesheets/overlay.css">
    <script src="javascripts/overlay.js"></script>
</head>