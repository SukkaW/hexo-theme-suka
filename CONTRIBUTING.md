

# Commit message format

*Read this in other languages: [English](CONTRIBUTING.md), [简体中文](CONTRIBUTING.zh-cn.md).*

## 1. Title (Header)

**（1）type**

`type` is used to describe the commit class. It must be one of the following:

- feat: A new feature
- fix: A bug fix
- docs: Documentation related, such as changes on GitHub template or README.
- style: Changes that related to UI/UX or some small changes at appearance.
- codestyle: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- test: Adding missing tests or correcting existing tests
- chore: Changes that affect the build system or external dependencies
- merge: Merge Pull Request
- str: Including but not limited to the changes in the directory and the establishment of the theme structure


**（2）scope**

`scope` is used to describe the scope of the impact of commit, such as sns, lang, share, post.

`scope` is placed after `type` and within parenthesis (`()`).

**（3）subject**

`subject` is a short description of the commit purpose, not more than 50 characters.

- starts with a verb and uses the first person present, such as change, not changed or changes
- The first letter is lowercase
- End without a period (.)

---

See #119 `refactor(sns): simplify conditional display` for example.

## 2. Body

Body is a detailed description that can be divided into multiple lines. The following is an example.

> More detailed explanatory text, if necessary.

> Further paragraphs come after blank lines.

> - Bullet points are okay, too
- Use a hanging indent

There are two points to note:

(1) Use the first person present, such as `change` instead of `changed` or `changes`.

(2) The motivation for the code change should be stated, as well as the comparison with the previous behavior.

## 3. Footer

The Footer section is used only in two cases.

** (1) Incompatible changes **

If the current code is incompatible with the previous version, the Footer section begins with `BREAKING CHANGE`, followed by a description of the change, along with the reason for the change and the migration method.

    BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: {
       myAttr: 'attribute',
    }

    After:

    scope: {
       myAttr: '@',
    }

    The removed `inject` wasn't generally useful for directives so there should be no code using it.

** (2) Close Issue **

If the current commit is for an issue, then you can close the issue in the Footer section.

    Closes #234

You can also close more than one issue at a time.

    Closes #123, #245, #992.

## 4. Revert

There is also a special case that if the current commit is used to revoke a previous commit, it must begin with `revert:` followed by the commit header.

    revert: feat(pencil): add 'graphiteWidth' option

    This reverts commit 667ecc1654a317a13331b17617d973392f415f02.

Body part of the format is fixed, must be written as `This reverts commit <hash>.`, Where `hash` is revoked SHA identifier of the commit.

If the current commit is in the same release as the revoked commit, they will not appear in the Change log. If the two are in different releases, the current commit will appear in the Change log under the `Reverts` subtitle.

## 5. Merge

When merging Pull Request, use `merge` as type of commit, use the number as scope of commit. This is an example: `merge(#402): merge feat/footer_text into canary`

When merging a pull request using Squash,fill subject with the summary of the changes,fill body with bullet points with every commit information(GitHub will automatically generate it for you when you are at github.com)


A Branch should include this three parts, and use `/` as sseparator:

- type
- scope
- subject

# Branch name format

## Type

A `type` is used to mark what the branch used for.There are some examples:

- feat: New Feature
- fix: Fix a bug
- docs: About Documentiations
- style: Format (And it won't affect the code running)
- refactor: Refactor(No new feature will be added or no bugs will be fixed)
- test: Test
- chore: Update our tools

## scope

It is used to explain which parts will this branch mainly affected.

## subject(Unnecessary)

This tell which objects will be affected, or why we open this branch.

-----

Here are some examples for branch names:

- fix/jsload
- fix/comment/disqusclick
- feat/sidebar
- revert/nprogress