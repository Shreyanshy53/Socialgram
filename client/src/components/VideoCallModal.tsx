import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Mic, MicOff, Video, VideoOff, Phone } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  callType: "video" | "audio";
  roomName: string;
}

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export function VideoCallModal({
  isOpen,
  onClose,
  recipientName,
  callType,
  roomName,
}: VideoCallModalProps) {
  const jitsiContainer = useRef<HTMLDivElement>(null);
  const jitsiApi = useRef<any>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(callType === "video");

  useEffect(() => {
    if (!isOpen || !jitsiContainer.current) return;

    // Load Jitsi Meet script
    if (!window.JitsiMeetExternalAPI) {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = initializeJitsi;
      document.head.appendChild(script);
    } else {
      initializeJitsi();
    }

    return () => {
      if (jitsiApi.current) {
        jitsiApi.current.dispose();
        jitsiApi.current = null;
      }
    };
  }, [isOpen, roomName]);

  const initializeJitsi = () => {
    if (!jitsiContainer.current || !window.JitsiMeetExternalAPI) return;

    try {
      const options = {
        roomName: roomName,
        height: 600,
        parentNode: jitsiContainer.current,
        configOverwrite: {
          startWithAudioMuted: !isMicOn,
          startWithVideoMuted: !isVideoOn,
          disableSimulcast: false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "closedcaptions",
            "desktop",
            "fullscreen",
            "foptions",
            "hangup",
            "help",
            "mute-everyone",
            "raisehand",
            "recording",
            "settings",
            "shareaudio",
            "sharedvideo",
            "shortcuts",
            "stats",
            "tileview",
          ],
          HIDE_INVITE_MORE_HEADER: true,
          MOBILE_APP_PROMO: false,
        },
      };

      jitsiApi.current = new window.JitsiMeetExternalAPI(
        "meet.jit.si",
        options
      );

      // Listen for ready
      jitsiApi.current.addEventListener("videoConferenceJoined", () => {
        console.log("Video conference joined");
      });

      // Listen for disconnect
      jitsiApi.current.addEventListener("videoConferenceLeft", () => {
        onClose();
      });

      // Listen for errors
      jitsiApi.current.addEventListener("onDisplayNameChange", (data: any) => {
        console.log("Display name changed:", data);
      });
    } catch (error) {
      console.error("Failed to initialize Jitsi:", error);
    }
  };

  const toggleMic = () => {
    if (jitsiApi.current) {
      jitsiApi.current.executeCommand("toggleAudio");
      setIsMicOn(!isMicOn);
    }
  };

  const toggleVideo = () => {
    if (jitsiApi.current) {
      jitsiApi.current.executeCommand("toggleVideo");
      setIsVideoOn(!isVideoOn);
    }
  };

  const endCall = () => {
    if (jitsiApi.current) {
      jitsiApi.current.executeCommand("hangup");
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl w-full p-0 border-0"
        data-testid="dialog-video-call"
      >
        <DialogHeader className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-black/80 z-50 rounded-t-lg">
          <DialogTitle className="text-white">
            {callType === "video" ? "📹" : "📞"} Call with {recipientName}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
            data-testid="button-close-call"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div
          ref={jitsiContainer}
          className="w-full bg-black"
          style={{ height: "600px", marginTop: "50px" }}
          data-testid="container-jitsi-meet"
        />

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
          <Button
            variant={isMicOn ? "default" : "destructive"}
            size="icon"
            onClick={toggleMic}
            className="rounded-full h-12 w-12"
            data-testid="button-toggle-mic"
          >
            {isMicOn ? (
              <Mic className="h-5 w-5" />
            ) : (
              <MicOff className="h-5 w-5" />
            )}
          </Button>

          {callType === "video" && (
            <Button
              variant={isVideoOn ? "default" : "destructive"}
              size="icon"
              onClick={toggleVideo}
              className="rounded-full h-12 w-12"
              data-testid="button-toggle-video"
            >
              {isVideoOn ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </Button>
          )}

          <Button
            variant="destructive"
            size="icon"
            onClick={endCall}
            className="rounded-full h-12 w-12"
            data-testid="button-end-call"
          >
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
