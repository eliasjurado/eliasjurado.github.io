"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { L } from "@/components/l";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { site } from "@/lib/site";

// Tarjeta WhatsApp de /contact/: nombre y empresa opcionales arman el mensaje de wa.me.
export function WhatsAppCard() {
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");

  function open() {
    const n = nombre.trim();
    const e = empresa.trim();
    let intro = "";
    if (n && e) intro = `Hola Elías, soy ${n} de ${e}. `;
    else if (n) intro = `Hola Elías, soy ${n}. `;
    const mensaje = intro + site.whatsappMessages.contacto.replace(/^Hola Elías[,.]?\s*/i, "");
    const url = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Card className="card block gap-0 py-6 shadow-none">
      <div className="card__icon" aria-hidden="true">
        <Icon name="chat" className="card__svg" />
      </div>
      <h3 className="card__title">WhatsApp</h3>
      <p className="card__body">{site.contact.phone}</p>
      <form className="wa-form" id="wa-contact-form" onSubmit={(ev) => ev.preventDefault()}>
        <div className="wa-form__field">
          <L as="label" htmlFor="wa-nombre" en="Your name">
            Tu nombre
          </L>
          <L
            as="input"
            id="wa-nombre"
            type="text"
            placeholder="Ej. María García"
            attrs={{ placeholder: "contact.name_placeholder" }}
            autoComplete="given-name"
            maxLength={80}
            value={nombre}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setNombre(ev.target.value)}
          />
        </div>
        <div className="wa-form__field">
          <L as="label" htmlFor="wa-empresa" enHtml="Company or business <span class='contact-optional'>(optional)</span>">
            Empresa o emprendimiento <span className="contact-optional">(opcional)</span>
          </L>
          <L
            as="input"
            id="wa-empresa"
            type="text"
            placeholder="Ej. Estudio Nómada"
            attrs={{ placeholder: "contact.company_placeholder" }}
            autoComplete="organization"
            maxLength={80}
            value={empresa}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setEmpresa(ev.target.value)}
          />
        </div>
        <div className="wa-form__submit">
          <Button asChild>
            <L as="button" type="button" className="contact-wa-btn" id="wa-open-btn" en="Open conversation →" onClick={open}>
              Abrir conversación →
            </L>
          </Button>
        </div>
      </form>
    </Card>
  );
}
