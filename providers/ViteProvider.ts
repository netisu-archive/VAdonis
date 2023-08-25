import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import Env from '@ioc:Adonis/Core/Env';
import { readFileSync } from 'fs';

export default class ViteProvider {
  public static needsApplication = true;

  constructor(protected app: ApplicationContract) {}

  public async boot() {
    const View = this.app.container.resolveBinding('Adonis/Core/View');

    const served = () => {
      const port = Env.get('VITE_PORT', 3000);
      return `
      <script type="module" src="http://localhost:${port}/@vite/client"></script>
      <script type="module" src="http://localhost:${port}/resources/vue/app.ts" ></script>
    `;
    };

    const built = () => {
      const data = readFileSync('./public/build/manifest.json').toString();
      const manifest = JSON.parse(data);
      return `<script type="module" src="/build/${manifest['resources/vue/app.ts']['file']}"></script>`;
    };
    View.registerTag({
      tagName: 'vite',
      seekable: false,
      block: false,
      compile(_, buffer) {
        buffer.outputRaw(
          Env.get('NODE_ENV') === 'development' ? served() : built(),
        );
      },
    });
  }
}
