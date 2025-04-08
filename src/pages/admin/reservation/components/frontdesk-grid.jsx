import React, { useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import "@/assets/css/timeline-grid.css";
import ReservationDialog from "./reservation-dialog";

const FrontDeskGrid = ({ currentDate, roomData, header }) => {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const [note, setNote] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [selectedRange, setSelectedRange] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const leftPanelRef = React.useRef(null);
  const rightPanelRef = React.useRef(null);

  const handleScroll = (sourceRef, targetRef) => {
    if (sourceRef.current && targetRef.current) {
      targetRef.current.scrollTop = sourceRef.current.scrollTop;
    }
  };

  const handleMouseDown = (roomName, dayIndex) => {
    setIsDragging(true);
    setSelectionStart({ room: roomName, dayIndex });
    setSelectionEnd({ room: roomName, dayIndex });
    setSelectedRange([{ room: roomName, dayIndex }]);
  };

  const handleMouseEnter = (roomName, dayIndex) => {
    if (!isDragging) return;
    if (roomName !== selectionStart.room) return;

    setSelectionEnd({ room: roomName, dayIndex });

    const startIndex = Math.min(selectionStart.dayIndex, dayIndex);
    const endIndex = Math.max(selectionStart.dayIndex, dayIndex);
    const newRange = [];

    for (let i = startIndex; i <= endIndex; i++) {
      newRange.push({ room: roomName, dayIndex: i });
    }

    setSelectedRange(newRange);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (selectionStart && selectionEnd) {
        const newNote = `Selected range: ${selectionStart.room} from ${format(
          days[selectionStart.dayIndex],
          "d MMMM"
        )} to ${format(days[selectionEnd.dayIndex], "d MMMM")}`;
        setNote(newNote);
        console.log(newNote);
        setIsDialogOpen(true);
      }
    }
  };

  const clearSelection = () => {
    setSelectionStart(null);
    setSelectionEnd(null);
    setSelectedRange([]);
    setNote("");
    setIsDialogOpen(false);
  };

  const isCellSelected = (roomName, dayIndex) => {
    return selectedRange.some(
      (cell) => cell.room === roomName && cell.dayIndex === dayIndex
    );
  };

  const isStartCell = (roomName, dayIndex) =>
    selectionStart?.room === roomName && selectionStart?.dayIndex === dayIndex;
  const isEndCell = (roomName, dayIndex) =>
    selectionEnd?.room === roomName && selectionEnd?.dayIndex === dayIndex;

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (selectionStart && selectionEnd) {
          console.log(
            `Selected range: ${selectionStart.room} from ${format(
              days[selectionStart.dayIndex],
              "d MMMM yyyy"
            )} to ${format(days[selectionEnd.dayIndex], "d MMMM yyyy")}`
          );
          setIsDialogOpen(true);
        }
      }
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => document.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging, selectionStart, selectionEnd, days]);

  const selectedRoomData =
    selectionStart && roomData
      ? roomData.find((r) => r.room_name === selectionStart.room)
      : null;

  return (
    <Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className='hidden'>
            Open
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reservation Details</DialogTitle>
            <DialogDescription>
              {note || "No selection made yet."}
            </DialogDescription>
          </DialogHeader>
          {selectionStart && selectionEnd && (
            // ! Add ReservationDialog component here
            <ReservationDialog
              currentDate={currentDate}
              start={selectionStart.dayIndex}
              end={selectionEnd.dayIndex}
              room={selectedRoomData}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
      <CardContent className='p-0'>
        <div className='flex justify-between m-2'>
          {header}
          <Button onClick={clearSelection} variant='outline'>
            Clear Selection
          </Button>
        </div>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={10} minSize={6} maxSize={15}>
            <div
              className='h-full overflow-auto'
              ref={leftPanelRef}
              onScroll={() => handleScroll(leftPanelRef, rightPanelRef)}>
              <div className='sticky top-0 bg-secondary border-b p-2 font-semibold text-sm h-10'>
                Rooms
              </div>
              {roomData.map((room) => (
                <div key={room.room_id} className='border-b p-2 text-sm h-10'>
                  {room.room_name}
                </div>
              ))}
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} minSize={30} className='w-[600px]'>
            <div
              className='overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary'
              ref={rightPanelRef}
              onScroll={() => handleScroll(rightPanelRef, leftPanelRef)}>
              <div
                className='grid relative'
                style={{
                  gridTemplateColumns: `repeat(${days.length}, 50px)`,
                  maxWidth: "100%",
                }}
                onMouseUp={handleMouseUp}>
                {days.map((day) => (
                  <div
                    key={day}
                    className='sticky top-0 text-sm h-10 border-b p-2 text-center min-w-8 bg-secondary'>
                    {format(day, "d")} {format(day, "EEE").charAt(0)}
                  </div>
                ))}
                {roomData.map((room, index) => {
                  const roomSelection = selectedRange.filter(
                    (cell) => cell.room === room.room_name
                  );
                  const startIndex = roomSelection.length
                    ? Math.min(...roomSelection.map((cell) => cell.dayIndex))
                    : null;
                  const endIndex = roomSelection.length
                    ? Math.max(...roomSelection.map((cell) => cell.dayIndex))
                    : null;

                  return (
                    <React.Fragment key={room.room_id}>
                      {startIndex !== null && endIndex !== null && (
                        <div
                          className='absolute z-10'
                          style={{
                            top: `${40 * (index + 1)}px`,
                            left: `${startIndex * 50 + 50 * 0.6}px`,
                            width: `${
                              (endIndex - startIndex + 1) * 50 -
                              50 * 0.6 +
                              50 * 0.4
                            }px`,
                            height: "25px",
                          }}>
                          <TooltipProvider>
                            <Tooltip delayDuration={200}>
                              <TooltipTrigger asChild>
                                <div
                                  className={`h-full cursor-pointer transform skew-x-[-12deg] ${
                                    isStartCell(room.room_name, startIndex) ||
                                    isEndCell(room.room_name, endIndex)
                                      ? "bg-green-400"
                                      : "bg-green-300"
                                  }`}>
                                  <span className='text-sm text-white ps-2'>
                                    Hello
                                  </span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className='text-sm'>{note}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                      {days.map((day, dayIndex) => (
                        <div
                          key={`${room.room_id}-${day}`}
                          className={`border-b p-2 cursor-pointer hover:bg-secondary min-w-8 ${
                            isCellSelected(room.room_name, dayIndex)
                              ? ""
                              : "border-r"
                          }`}
                          style={{ height: "40px" }}
                          onMouseDown={() =>
                            handleMouseDown(room.room_name, dayIndex)
                          }
                          onMouseEnter={() =>
                            handleMouseEnter(room.room_name, dayIndex)
                          }
                        />
                      ))}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

FrontDeskGrid.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  rooms: PropTypes.arrayOf(PropTypes.string),
  roomData: PropTypes.arrayOf(PropTypes.object),
  header: PropTypes.node,
};

export default FrontDeskGrid;
