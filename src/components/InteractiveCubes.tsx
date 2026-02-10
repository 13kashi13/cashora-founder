import Cubes from './Cubes';
import MagnetLines from './MagnetLines';

const InteractiveCubes = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p 
            className="text-sm font-black tracking-[0.3em] uppercase mb-4"
            style={{
              background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            INTERACTIVE EXPERIENCE
          </p>
          <h2 className="font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase" style={{ color: '#fff' }}>
            ENGAGE & EXPLORE
          </h2>
          <p className="text-white/70 mt-4 text-lg font-bold uppercase max-w-2xl mx-auto">
            CLICK THE CUBES OR HOVER OVER THE LINES
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Cubes */}
          <div className="backdrop-blur-xl rounded-3xl p-8" style={{
            background: 'rgba(5, 10, 10, 0.4)',
            border: '1px solid rgba(124, 255, 178, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}>
            <h3 className="text-2xl font-black uppercase mb-6 text-center" style={{ color: '#7CFFB2' }}>
              3D CUBES
            </h3>
            <div style={{ height: '500px', position: 'relative' }}>
              <Cubes
                gridSize={8}
                maxAngle={45}
                radius={3}
                borderStyle="2px dashed #7CFFB2"
                faceColor="rgba(5, 10, 10, 0.6)"
                rippleColor="#7CFFB2"
                rippleSpeed={1.5}
                autoAnimate
                rippleOnClick
              />
            </div>
          </div>

          {/* Magnet Lines */}
          <div className="backdrop-blur-xl rounded-3xl p-8" style={{
            background: 'rgba(5, 10, 10, 0.4)',
            border: '1px solid rgba(92, 225, 230, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}>
            <h3 className="text-2xl font-black uppercase mb-6 text-center" style={{ color: '#5CE1E6' }}>
              MAGNET LINES
            </h3>
            <div className="flex items-center justify-center" style={{ height: '500px' }}>
              <MagnetLines
                rows={10}
                columns={12}
                containerSize="min(500px, 100%)"
                lineColor="#5CE1E6"
                lineWidth="2px"
                lineHeight="30px"
                baseAngle={0}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCubes;
