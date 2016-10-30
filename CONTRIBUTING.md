# Installation

```sh
git clone https://github.com/JClerc/GreenSpot.git
cd GreenSpot
git checkout develop
npm install
```

# Working with Gulp

If you have Gulp installed globally:
```
gulp
```

And if you haven't:
```
npm run gulp
```

# Guidelines

- Indentation is made with 2 spaces.
- Commit messages should be "[<scope>:<language>] <message>", e.g.: "[menu:css] Fix navigation menu"

### CSS

We are using [SCSS](http://sass-lang.com/) for making our styles, and [BEM](https://en.bem.info/) for naming conventions.

### JavaScript

ES6 is used (and converted to ES5 using Babel) in our project. We use the general coding conventions, as defined [here](http://www.w3schools.com/js/js_conventions.asp).

# Merging branches

**1. Update version**

Always merge branches after updating README.md with correct version number, with commit message in following format: "Version X.X.X".

```sh
# On branch develop
git checkout develop
# Update version number
vim README.md
# README.md must be the only file in this commit
git add README.md
# Commit with version number
git commit -m "Version X.X.X"
```

**2. Merge branches**

Ignore changes in master, since develop has latest changes.

```sh
# Move to master
git checkout master
# Merge and discard changes in master
git merge develop -X theirs 
```

**3. Create tag**

Each version must have his own tag.

```sh
# Still on branch master
git checkout master
# Create tag
git tag vX.X.X
# Push with new tag
git push origin --tags
```

