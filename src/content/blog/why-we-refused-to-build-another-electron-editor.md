---
title: "Why We Refused To Build Another Electron Editor"
description: "Some Mac apps feel like part of the system; others feel like websites in a Mac costume. Why DataIsland builds only native Mac software."
pubDate: 2026-10-02
topics: [essays, mac-tips]
apps: [polywrite]
---

If you've used enough software on a Mac, you've probably noticed something strange. Some applications feel like part of the operating system. Others feel like visitors. You may not know why.

You may not even consciously notice it. But you feel it. The scrolling is slightly different. The text selection feels a little heavier. Menus behave almost, but not quite, like other Mac applications. Keyboard shortcuts occasionally surprise you.

Battery life isn't what it should be. Memory consumption seems excessive for what the app actually does. Eventually you discover the reason. Many modern applications aren't really Mac applications at all.

They're websites wearing a Mac costume.

## The Great Convergence

From a software company's perspective, the appeal is obvious. Building separate applications for Windows, Mac, Linux, and the web is expensive. Every platform has its own conventions. Its own frameworks. Its own tooling. Its own maintenance burden. Cross-platform frameworks promise a shortcut. Write once. Deploy everywhere. Maintain a single codebase. Reduce costs. Speed up development. Those are compelling arguments.

It's easy to understand why so many companies chose that path.

## The User Pays The Difference

The difficulty is that software engineering decisions rarely disappear. Someone pays for them. If development becomes easier for the vendor, the compromise often appears somewhere in the user experience. Sometimes the compromise is small. Sometimes it isn't.

A native application is built around the expectations of the operating system it lives on. Its controls behave correctly. Its accessibility features integrate naturally. Its text system understands the platform. Its keyboard shortcuts feel familiar. The application belongs.

A transplanted application may work perfectly well. But it often feels slightly disconnected from the environment around it. One paper cut isn't significant. Hundreds become noticeable.

## Mac Users Are Different

Mac users have historically cared about software quality in ways many markets do not. That isn't snobbery. It's history. The Macintosh built its reputation on software that felt intentionally designed.

Applications were expected to be polished. Interfaces mattered. Typography mattered. Interaction mattered. The software wasn't merely expected to function. It was expected to be pleasant. That expectation never completely disappeared.

Even today, Mac users frequently choose a slower feature rollout in exchange for a better experience. They notice details. They value integration. They appreciate software that feels at home on their machines.

## Native Software Ages Better

One of the less discussed advantages of native software is longevity. Operating systems evolve. New frameworks appear. System capabilities expand. Applications built around platform technology often inherit those improvements naturally. Language support improves. Accessibility improves. Performance improves.

New operating-system features become easier to adopt. The application continues to evolve alongside the platform. Software built at a greater distance from the operating system often has a harder journey. Every improvement must travel through additional abstraction layers before reaching the user. Sometimes it arrives quickly.

Sometimes it never arrives at all.

## The Language Problem

This becomes particularly important when dealing with text. Modern macOS includes remarkable language technologies. Multilingual spell checking. Language detection. Translation services. International typography. Right-to-left writing systems.

Support for writing systems used by billions of people. A native application can take advantage of these capabilities directly. That means less reinvention. Less complexity. And often a better experience for the writer.

The operating system already understands the language. The application simply needs the humility to let it help.

## Fashion And Engineering

Technology has trends just like any other industry. Some technologies become fashionable. Others become unfashionable. These cycles are inevitable. But writers rarely care about fashion.

Writers care about whether the software helps them write. A journalist working toward a deadline doesn't care how trendy a framework is. A researcher finishing a paper doesn't care about engineering fashion. The software succeeds when it stays out of the way. Nothing more. Nothing less.

## Respecting The Platform

A platform is more than a distribution channel. It's an ecosystem. A collection of conventions, expectations, capabilities, and habits that users learn over many years. Great applications respect that ecosystem.

They don't attempt to replace it. They don't fight it. They work with it. The result often feels obvious. Natural. Effortless. As though the application was always supposed to exist.

## Why We Built Native

At DataIsland, we build exclusively for macOS. That decision eliminates large markets. It limits potential customers. It unquestionably makes some business decisions harder. But it also provides focus.

Instead of building for every platform, we can build deeply for one. PolyWrite embraces native macOS technologies, including multilingual spell checking, language detection, translation services, and support for right-to-left writing systems already available within the operating system. The goal is not to recreate macOS inside an application. The goal is to let macOS do what it already does well and surface those capabilities where writers can actually use them. Because software should feel like it belongs on the machine where it runs. Not like it arrived from somewhere else.
