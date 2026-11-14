<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- SmartKlimat Idag is isolated in `src/lib/hub`, `src/components/hub`, and `src/routes/idag*`; keep all Redaktionen traffic behind server boundaries and preserve the default-deny host gate so the hidden hub cannot expose content or crash the public site.
