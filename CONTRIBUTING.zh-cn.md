# Commit message format

*其他语言版本: [English](CONTRIBUTING.md), [简体中文](CONTRIBUTING.zh-cn.md).*

## 1. Title (Header)

**（1）type**

`type` 用于说明 commit 的类别，只允许使用下面的标识。

- feat: New feature 新功能
- fix: Fix bug 修补 bug
- docs: Documentation 文档（包括 README 的更新）
- style: UI/UX 主题外观样式和风格的改动
- codestyle: Format 格式（不影响代码运行的变动）
- refactor: Refactor 重构
- test: Test 增加测试
- chore: 构建过程或辅助工具的变动
- merge: 合并 Pull Request
- str: 结构的改变，包括但不限于目录变动和主题框架的搭建

**（2）scope**

`scope` 用于说明 commit 影响的范围，比如 sns，lang，share，post。

`scope` 紧接 `type` 置于 `()` 之内。

**（3）subject**

`subject` 是 commit 目的的简短描述，不超过 50 个字符。

- 以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
- 第一个字母小写
- 结尾不加句号（.）

---

Title 可参考 #119 `refactor(sns): simplify conditional display`

## 2. Body

Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。

> More detailed explanatory text, if necessary.

> Further paragraphs come after blank lines.

> - Bullet points are okay, too
- Use a hanging indent

有两个注意点：

（1）使用第一人称现在时，比如使用 `change` 而不是 `changed` 或 `changes`。

（2）应该说明代码变动的动机，以及与以前行为的对比。

## 3. Footer

Footer 部分只用于两种情况。

**（1）不兼容变动**

如果当前代码与上一个版本不兼容，则 Footer 部分以 `BREAKING CHANGE` 开头，后面是对变动的描述、以及变动理由和迁移方法。

```
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
```

**（2）关闭 Issue**

如果当前 commit 针对某个 issue，那么可以在 Footer 部分关闭这个 issue 。

`Closes #234`

也可以一次关闭多个 issue 。

`Closes #123, #245, #992`

## 4. Revert

还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以 `revert:` 开头，后面跟着被撤销 Commit 的 Header。

```
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

Body 部分的格式是固定的，必须写成 `This reverts commit <hash>.`，其中的 `hash` 是被撤销 commit 的 SHA 标识符。

如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的 `Reverts` 小标题下面。


## 5. Merge

当使用 Merge Pull Request 合并一个分支到另一个分支时，type 为 `merge`，scope 为 PR 的编号。这是一个范例：`merge(#402): merge feat/footer_text into canary`

使用 Squash 合并分支时，type 为 `merge`，scope 为 PR 的编号，subject 为这次 PR 主要改动的概括，body 为以无序列表排列的对应多条 commit 记录（在网页端使用 Squash 合并时，GitHub 会自动生成列表）。

一个 Branch 的命名应当包含三个部分，并使用 `/` 作为分隔符。

- type
- scope
- subject

# Branch name format

## Type

`type` 用于标记这个分支的作用。下面是一些例子：

- feat: 新的特性、新的功能
- fix: 修复 Bugs
- docs: 关于文档的更新
- style: 代码格式化，代码简化等（不影响代码的运行）
- refactor: 重构（没有新特性增加也没有 Bug 被修复）
- test: 项目测试
- chore: 升级工具（如 `gulpfile` 的更新）
- remove: 简单地将部分模块的代码从项目中移除

> 一个分支可以包含一或两个 Type。

## scope

用于注明项目中的哪一部分会被影响

## subject（非必须）

用于注明项目中这一部分中的哪些代码会被影响，或简单注明为什么新建了这个分支

----

这是几个分支命名的示例：

- fix/jsload
- fix/comment/disqusclick
- feat/sidebar
- revert/nprogress
