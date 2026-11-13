---
title: "How to Send a Note Between Macs on the Same Wi-Fi, No Internet Required"
description: "Want to pass a quick note, link or photo to another Mac in the house or office without email, iMessage or the cloud? Here's how local-network messaging works, and a free way to do it."
pubDate: 2026-11-13
topics: [mac-tips, privacy]
apps: [networknotes]
---

You want to send a Wi-Fi password, a link or a photo to the Mac in the next room. The usual options all take a detour: email goes out to a server and comes back, iMessage needs an internet connection and an Apple ID, and a cloud folder needs both of you signed in to the same account. Both Macs are on the same network, a few metres apart. Why does the message have to leave the building?

It doesn't. Your home or office network is perfectly capable of carrying a message directly from one Mac to another.

## The options built into macOS

**AirDrop** is the closest built-in answer, and it's great for sending a file once. It isn't a conversation, though: there's no history, and you have to accept each transfer as it arrives.

**iMessage** keeps a history, but it routes through Apple's servers, needs an internet connection, and both people need an Apple ID set up in Messages.

**Shared Notes or a cloud folder** works if everyone uses the same account or you've set up sharing, but neither is quick for a one-line message.

## Messaging over the local network

Macs can already find each other on a local network using **Bonjour**, the same technology that lets AirPrint printers and shared Macs show up without any setup. A local messaging app uses it to find other Macs nearby and then talks to them directly. Nothing is sent to the internet, so it keeps working when your internet connection is down, as long as the Wi-Fi or wired network is up.

Long-time Mac users may remember **Adium**, the little rubber duck in the menu bar that many people used for exactly this. When the chat protocols it relied on shut down, nothing really replaced it for quick messages around the house or office.

## Network Notes: a free local messenger

We built Network Notes to fill that gap. It sits in your menu bar and finds other Macs running it on your network within seconds. There are no IP addresses, no ports and no pairing to set up.

1. Install Network Notes on both Macs.
2. Each Mac shows up in the other's list automatically.
3. Click a name, type your note and press <kbd>⌘</kbd> <kbd>Return</kbd>.

You can send text, links (they arrive clickable) and images. Drag a picture into the compose window and it's sent straight across the local connection, with no cloud upload. **Send to All** broadcasts one note to everyone on the network at once, which is handy for "dinner's ready" or "the printer's fixed". Incoming messages open the history window even when it's buried behind other apps, and the history stays put.

> **Private by design.** Every message is encrypted end to end with AES-256-GCM, using keys from a P-256 key exchange between the two Macs, and the keys live in your Keychain. There's no DataIsland server in the path.

## Free to use and free to share

Network Notes is free, with no trial, no in-app purchases and no "pro" version. You're welcome to share it with family, housemates or colleagues. It's the little utility we wanted to exist, so we give it away.
