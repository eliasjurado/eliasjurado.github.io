#!/usr/bin/env bash
# Levanta el sitio en local para revisar el montaje del jaguar
# (bloque /about + sello de footer) antes de pushear.
#
# Uso:
#   ./preview-jaguar-local.sh          # Ruby local (bundle install + jekyll serve)
#   ./preview-jaguar-local.sh --docker # Docker (sin depender de tu Ruby del sistema)
#
# Este Gemfile.lock pinea github-pages 227 / jekyll 3.9.2, cuyas gems (p.ej.
# minitest 5.16.2) exigen Ruby < 4.0. Si tu Ruby de sistema es 4.x, `bundle
# install` falla con "requires ruby version < 4.0" — no es un bug del jaguar,
# es este lockfile viejo. Usa --docker o instala un Ruby 3.x con rbenv/rvm/asdf.

set -e
cd "$(dirname "$0")"

print_checklist() {
  echo
  echo "Revisar específicamente:"
  echo "  - http://localhost:4000/about/   → sección 'El jaguar' (relato de origen, fondo oscuro)"
  echo "  - Footer de cualquier página      → sello sutil del jaguar abajo a la derecha"
  echo
  echo "Checklist rápido (Chrome DevTools → Toggle device toolbar):"
  echo "  - 390px  (móvil, caso primario): el sello del footer debe OCULTARSE (<480px)."
  echo "  - 1440px (desktop): jaguar en /about a dos columnas, sello visible y atenuado en el footer."
  echo "  - El jaguar SOLO debe verse sobre fondo oscuro; nunca en el header ni como favicon."
  echo
}

if [[ "$1" == "--docker" ]]; then
  echo "→ Levantando con Docker (jekyll/jekyll:4.0, ignora tu Ruby de sistema)..."
  print_checklist
  docker-compose up
  exit 0
fi

# ── Chequeo de versión de Ruby antes de intentar bundle install ─────────────
RUBY_MAJOR="$(ruby -e 'print RUBY_VERSION.split(".").first' 2>/dev/null || echo "?")"

if [[ "$RUBY_MAJOR" == "?" ]]; then
  echo "✗ No encontré 'ruby' en el PATH. Usa Docker en su lugar:"
  echo "    ./preview-jaguar-local.sh --docker"
  exit 1
fi

if [[ "$RUBY_MAJOR" -ge 4 ]]; then
  echo "✗ Tu Ruby de sistema es $(ruby -v) — este Gemfile.lock (github-pages 227 /"
  echo "  jekyll 3.9.2) pinea gems como minitest 5.16.2 que exigen Ruby < 4.0."
  echo "  bundle install va a fallar igual que antes. Dos salidas:"
  echo
  echo "  Opción A (rápida, recomendada) — Docker, no toca tu Ruby de sistema:"
  echo "    ./preview-jaguar-local.sh --docker"
  echo
  echo "  Opción B — instalar un Ruby 3.x con rbenv y fijarlo para este proyecto:"
  echo "    brew install rbenv ruby-build   # si no los tienes"
  echo "    rbenv install 3.3.6"
  echo "    echo '3.3.6' > .ruby-version"
  echo "    rbenv local 3.3.6"
  echo "    rbenv exec gem install bundler"
  echo "    rbenv exec bundle install"
  echo "    rbenv exec bundle exec jekyll serve --livereload"
  exit 1
fi

echo "→ Ruby $(ruby -v | awk '{print $2}') OK (<4.0). Instalando/actualizando gems..."
bundle install

echo
echo "→ Levantando Jekyll con live reload en http://localhost:4000 ..."
print_checklist

bundle exec jekyll serve --livereload
