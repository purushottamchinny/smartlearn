import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;600&display=swap');

  .cert-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 50px 20px;
    background: #e5e5e5;
    min-height: 100vh;
  }

  .certificate {
    width: 1000px;
    height: 707px;
    position: relative;
    background: #ffffff;
    padding: 40px;
    box-sizing: border-box;
    box-shadow: 0 40px 100px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  /* Elegant Double Border */
  .cert-border-main {
    position: absolute;
    inset: 20px;
    border: 8px double #b5924c;
    z-index: 2;
  }

  .cert-border-thin {
    position: absolute;
    inset: 40px;
    border: 1px solid #d4b98a;
    z-index: 2;
  }

  .cert-bg-texture {
    position: absolute;
    inset: 0;
    background-color: #fffcf5;
    background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
    opacity: 0.4;
    z-index: 1;
  }

  /* Decorative Corner Ornaments */
  .corner {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px solid #b5924c;
    z-index: 3;
  }
  .tl { top: 0; left: 0; border-right: none; border-bottom: none; }
  .tr { top: 0; right: 0; border-left: none; border-bottom: none; }
  .bl { bottom: 0; left: 0; border-right: none; border-top: none; }
  .br { bottom: 0; right: 0; border-left: none; border-top: none; }

  .cert-content {
    position: relative;
    z-index: 5;
    text-align: center;
    width: 100%;
    padding: 60px;
    font-family: 'Libre Baskerville', serif;
    color: #2c2c2c;
  }

  .cert-header {
    font-family: 'Cinzel', serif;
    font-size: 14px;
    letter-spacing: 6px;
    color: #b5924c;
    margin-bottom: 20px;
    font-weight: 700;
  }

  .cert-main-title {
    font-family: 'Cinzel', serif;
    font-size: 64px;
    color: #1a1a1a;
    margin: 0;
    line-height: 1;
    text-transform: uppercase;
  }

  .cert-sub-title {
    font-size: 22px;
    font-style: italic;
    color: #8a6f3e;
    margin: 10px 0 40px 0;
  }

  .cert-presented-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #666;
  }

  .cert-recipient-name {
    font-size: 52px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 20px 0;
    border-bottom: 2px solid #b5924c;
    display: inline-block;
    padding: 0 40px 5px 40px;
  }

  .cert-course-title {
    font-size: 26px;
    font-weight: 700;
    color: #1a1a1a;
    margin-top: 10px;
  }

  .cert-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 60px;
    padding: 0 40px;
  }

  .footer-item {
    width: 200px;
    border-top: 1px solid #b5924c;
    padding-top: 10px;
  }

  .footer-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #8a6f3e;
  }

  .footer-value {
    font-size: 14px;
    font-weight: bold;
    color: #1a1a1a;
  }

  .gold-seal {
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, #e0c97f 0%, #b5924c 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    border: 2px dashed #ffffff;
    font-size: 40px;
    position: relative;
    top: 20px;
  }

  .download-bar {
    display: flex;
    gap: 20px;
  }

  .btn-pro {
    padding: 16px 40px;
    background: #1a1a1a;
    color: #e0c97f;
    border: 1px solid #b5924c;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-pro:hover {
    background: #b5924c;
    color: #fff;
  }
`;

export default function Certificate({ course, user, progress }) {
  const certificateRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async (type) => {
    if (!certificateRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3, // Ultra-high resolution
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL('image/png');

      if (type === 'png') {
        const link = document.createElement('a');
        link.download = `${user.name}_Certificate.png`;
        link.href = imgData;
        link.click();
      } else {
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${user.name}_Certificate.pdf`);
      }
    } catch (error) {
      console.error("Export Error:", error);
      alert("There was an error generating your certificate.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!progress?.completed) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="cert-wrapper">
        <div className="certificate" ref={certificateRef}>
          <div className="cert-bg-texture" />
          <div className="cert-border-main" />
          <div className="cert-border-thin" />
          
          <div className="corner tl" />
          <div className="corner tr" />
          <div className="corner bl" />
          <div className="corner br" />

          <div className="cert-content">
            <div className="cert-header">Official Recognition of Achievement</div>
            <h1 className="cert-main-title">Certificate</h1>
            <div className="cert-sub-title">of Completion</div>
            
            <div className="cert-presented-text">This is to certify that</div>
            <div className="cert-recipient-name">{user.name}</div>
            
            <div className="cert-presented-text">has successfully satisfied all requirements for</div>
            <div className="cert-course-title">{course.title}</div>

            <div className="cert-footer">
              <div className="footer-item">
                <div className="footer-value">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div className="footer-label">Date Issued</div>
              </div>

              <div className="gold-seal">🏆</div>

              <div className="footer-item">
                <div className="footer-value">ID: {Date.now().toString(36).toUpperCase()}</div>
                <div className="footer-label">Verification ID</div>
              </div>
            </div>
          </div>
        </div>

        <div className="download-bar">
          <button className="btn-pro" onClick={() => handleExport('png')} disabled={isGenerating}>
            {isGenerating ? "Preparing..." : "Export as Image"}
          </button>
          <button className="btn-pro" onClick={() => handleExport('pdf')} disabled={isGenerating}>
            {isGenerating ? "Preparing..." : "Export as PDF"}
          </button>
        </div>
      </div>
    </>
  );
}