/**
 * Abre un snackbar.
 * @param type - Tipo de snackbar 'info' | 'delete' | 'done' | 'error' | 'warning'.
 * @param message - Mensaje.
 * @param time - Tiempo de espera para cerrar (ms), por defecto 5000 | 0 == No se cierra automaticamente.
 */
export function snackbar(type: 'info' | 'delete' | 'done' | 'error' | 'warning', message: string, time?: number) {
  const snackbar = document.createElement('div');

  const close = (id?: string) => {
    const el = id ? document.getElementById(id) : snackbar
    el?.classList.add('remove');
    setTimeout(() => {
      el?.remove();
    }, 100);
  }
  close('snackbar');

  const template =
    `<button class="fab icon" id="closeSnackbar">close</button>
  <div class="content">
      <label class="icon">
      ${type}
      </label>
      <p>
          ${message}
      </p>
  </div>`;

  snackbar.classList.add('snackbar');
  snackbar.classList.add(type);
  snackbar.id = 'snackbar';
  snackbar.innerHTML = template.trim();
  document.body.appendChild(snackbar);
  document.getElementById('closeSnackbar')?.addEventListener('click', () => {
    close();
  });

  if (time !== 0) {
    setTimeout(() => {
      close();
    }, typeof time === 'number' ? time : 5000);
  }
}