import { useState } from "react";
import { Check } from "lucide-react";

interface SubmissionLoaderProps {
  isSuccess: boolean;
}

export default function SubmissionLoader({ isSuccess }: SubmissionLoaderProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background:
          "radial-gradient(circle at top, rgba(16, 185, 129, 0.15), transparent 45%), #0e0f0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {!isSuccess ? (
          <>
            <div
              style={{
                position: "relative",
                width: "120px",
                height: "60px",
              }}
            >
              <svg
                viewBox="0 0 120 60"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <path
                  d="M 20,30 Q 20,10 40,10 Q 60,10 60,30 Q 60,50 40,50 Q 20,50 20,30 M 60,30 Q 60,10 80,10 Q 100,10 100,30 Q 100,50 80,50 Q 60,50 60,30"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    animation: "infinityGlow 2s ease-in-out infinite",
                  }}
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4">
                      <animate
                        attributeName="stop-opacity"
                        values="0.4;1;0.4"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#4ade80" stopOpacity="1" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.4">
                      <animate
                        attributeName="stop-opacity"
                        values="0.4;1;0.4"
                        dur="2s"
                        repeatCount="indefinite"
                        begin="1s"
                      />
                    </stop>
                  </linearGradient>
                </defs>
              </svg>

              {/* Animated dot */}
              <div
                style={{
                  position: "absolute",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4ade80, #10b981)",
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.6)",
                  animation: "infinityDot 3s ease-in-out infinite",
                }}
              />
            </div>

            <div
              style={{
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  color: "#f8fafc",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              >
                Submitting Application
              </h2>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.875rem",
                }}
              >
                Please wait while we process your information...
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Success State */}
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.1)",
                backdropFilter: "blur(12px)",
                border: "2px solid rgba(16, 185, 129, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "scaleIn 0.5s ease-out",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4ade80, #10b981)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 40px rgba(16, 185, 129, 0.4)",
                }}
              >
                <Check
                  size={48}
                  color="white"
                  strokeWidth={3}
                  style={{
                    animation: "checkmark 0.5s ease-out 0.2s both",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                animation: "fadeInUp 0.6s ease-out 0.3s both",
              }}
            >
              <h2
                style={{
                  color: "#f8fafc",
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                }}
              >
                Application Submitted!
              </h2>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                Your application has been successfully submitted.
              </p>
              <p
                style={{
                  color: "#10b981",
                  fontSize: "0.875rem",
                }}
              >
                Redirecting to your dashboard...
              </p>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes infinityGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 16px rgba(16, 185, 129, 0.8));
          }
        }

        @keyframes infinityDot {
          0% {
            offset-distance: 0%;
            opacity: 1;
          }
          25% {
            opacity: 0.6;
          }
          50% {
            offset-distance: 50%;
            opacity: 1;
          }
          75% {
            opacity: 0.6;
          }
          100% {
            offset-distance: 100%;
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(0deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
