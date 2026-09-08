import { ImageResponse } from 'next/og';

export const alt = 'ANDREY BAGER — WEB DESIGNER / AI / AUTOMATION';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          backgroundColor: '#090a0d',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
          }}
        >
          ANDREY BAGER
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: '#a3a8b5',
          }}
        >
          WEB DESIGNER / AI / AUTOMATION
        </div>
      </div>
    ),
    size,
  );
}
