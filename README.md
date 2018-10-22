<img src="https://outrightgeekery.files.wordpress.com/2014/06/marvel-logo-featured.jpg?w=768&h=426&crop=1" width="150" align="right">

# Input Search for marvel API

Table of Contents
=================

* [Getting Started](#getting-started)
  * [Depedencies](#depedencies)
  * [Key Features](#key-features)
* [How To Run](#how-to-run)  
* [How To Test](#how-to-test)  

## Getting started


### Depedencies:
  - SCSS: Alternate syntax for CSS
  - CleanCss: Tool to minify css
  - Gulp: To automate SCSS to CSS compiling, and css minification
  - Axios: For ajax requests
  - Enzyme: For testing
  - Sinon: For Ajax Testing
  
  *Note: Chose not to use a lib such as redux, due to the simplicity of the app.*
  
### Key Features:

  - **Debounce:** Properly debounced the input, so that MARVEL API is not overloaded Ajax requests, on every keystroke
  - **Ajax-Loader:** A loader appears everytime an ajax request is made, improving the user experience
  

## How To Run

**IMPORTANT: Change .env.development API KEYS with your marel API keys**

```bash
~ cd marvel_input_search
~ npm set strict-ssl false //Enzyme throws error with strict-ssl 
~ npm install
~ npm start
```

*If new browser window doesn't open automatically, hit localhost:3000*

## How To Test

Two simple tests are included:
  - A test to ensure proper component rendering for component "ComboBox".
  - A test to ensure the ajax request is properly triggered when user types, in the input field.
  
```bash
~  npm test
```
then press 'a'
*and pray*
