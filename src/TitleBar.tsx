import { getCurrentWindow } from '@tauri-apps/api/window';

const appWindow = getCurrentWindow();

function TitleBar() {
  return (
    <div
      data-tauri-drag-region
      className="relative rounded-t-2xl h-9 w-full flex items-center justify-end px-3 bg-zinc-950 select-none"
    >
      <span className="absolute left-1/2 -translate-x-1/2 text-sm text-zinc-300 pointer-events-none">
        tiragem de tarô
      </span>

      <div className="flex gap-1">
        <button
          onClick={() => appWindow.minimize()}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-800 text-zinc-300 active:translate-y-1 transition-transform"
        >
          —
        </button>

        <button
          onClick={() => appWindow.close()}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-800 text-zinc-300 active:translate-y-1 transition-transform"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default TitleBar;