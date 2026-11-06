---
description: How a design document in `docs/design/` is written — what it answers about the part of
  the system it names, and what it leaves to the code and to the FAQ.
paths:
  - 'docs/design/**'
---

# Design documentation standard

How a design document is written — one of the design documentation in `docs/design/`, saying how one
part of the system works. [The design index](../design/index.md) names every one of them and says
what each covers. What holds of every document in `docs/` is [the documentation
standard](docs-standard.md), and this is read on top of it; [the standards
standard](docs-standards-standard.md) holds the other half, the rules a change is held to.

## What a design document answers

**A design document answers two questions about its part: what it does, and what implements it.**
Write the functional half first — what a deployment declares, what a person gets, what the part is
for — and the technical half as the files a reader has to open to change it.

**The technical half names where a change starts, not everything it touches.** The token, the
script, the component, the shared rule: two or three names a reader opens next, rather than a map of
the repository.

**The authority is named and deferred to.** Where a file already states something — `tokens.json`,
a list's comment — name it as the authority and write only the part the file cannot say.

```markdown
**`src/theme/roles.ts` is the authoritative list of what a deployment may override.** What this
document holds is the part the list cannot say: why a status color stays out of it.
```

**A design document says why, where the why would otherwise be re-decided.** A reader who can see
what the code does and not why it does it is the one who undoes it.

## Shape of a design document

**A design document is named for the part it describes, and carries no suffix** — `<part>.md`. It
opens no frontmatter either: only a standard carries one.

**It opens by saying what the part is and what the document covers**, in a paragraph or two under
the heading, and links the document that owns what it leaves out.

**A section is one question about the part, and its heading is that question or its answer.** A
subsection answers one case of it, because [a heading's depth is how general it
is](docs-standard.md#mechanics) here as in a standard.

**A claim leads in bold, and the sentences under it argue it.** Two to five: a design document
carries the reasoning that a standard compresses into a rule.

**The sections run from function to technical, and the functional half is readable by somebody
entering the project.** What a deployment declares, what a person gets and what the part refuses
come first, and nothing there asks the reader to have opened a file; the sections naming the tokens,
the selectors, the scripts and the files come after. A reader who stops halfway is left with what
the part is for rather than with how it is spelled, and the [two
questions](#what-a-design-document-answers) are answered in the order they are asked.

**The [closing section](docs-standard.md#shape-of-a-document) is headed _What this document does not
settle_.** Spell it that way in every design document, so that a reader checking whether a subject
was left open on purpose has one heading to search for.

## What a design document leaves out

**The options that lost.** A design document states the decision; what was considered against it and
why it was rejected is an entry in `docs/design/design-faq.md`, linked from the sentence that states
the decision. The first such entry creates that file.

**The cost, the measurement and the migration path.** Name a consequence in a clause and send the
argument elsewhere. Writing it out is what turns a paragraph a reader skims into one they skip.

```markdown
**The theme builder carries its own copy of the derivation.** It is one standalone page — [the
design FAQ](design-faq.md#why-does-the-theme-builder-copy-the-derivation) holds what that costs.
```

**A signature, a field list or a call sequence.** Write what a reader cannot get from the file in
front of them.

**A code listing.** A fenced block holds a shape the prose cannot draw — a map of the selectors, a
directory tree — and nothing that would go stale with a rename.

## What this standard does not cover

**The standards.** [The standards standard](docs-standards-standard.md) holds how a rule is written
and what a standard states in place of code.

**What both halves share.** [The documentation standard](docs-standard.md) holds the naming, the
mechanics and the rule that a document is edited in place; a rule stated there is not restated here.

**The design FAQ's own shape.** Its preamble says what belongs in it and what an entry carries, and
is written with its first entry.

**[Running locally](../design/running-locally.md).** It is a getting-started guide rather than a
document describing a part of the system, and nothing here governs it.

**How long a design document may be.** Nothing says how long is right for a part.

---

← [How the code is written](index.md)
