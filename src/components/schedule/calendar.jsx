/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
import { Modal } from "./ModalSchedule";
import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

export function ScheduleCalendar({
  onSubmitDelete,
  setDeleteData,
  filterDatos,
  agruparEventos,
  eventData,
  updateData,
  onSubmitSchedule,
  control,
  consultingRoomId,
  handleNote,
  handleConsutingId,
  validate,
  addSchedule,
  setAllSchedule,
  allSchedule,
  setEditMode,
  handleNextButtonClick,
  handlePrevButtonClick,
  setIsModalOpen,
  isModalOpen,
  setEditData,
}) {
  const {
    spuName,
    consultingRoomName,
    serviceName,
    campusName,
    spuId,
    serviceId,
  } = validate;
  const [newId, setNewId] = useState(1);
  const [addData, setAddData] = useState([]);
  const calendarRef = useRef(null);
  const [options, setOptions] = useState(0); // 0 guardar, 1, ver
  const [showData, setShowData] = useState({});
  const [clickInfo, setClickInfo] = useState();

  const validateSelect = () => {
    return (
      Number(spuId) !== 0 &&
      Number(consultingRoomId) !== 0 &&
      Number(serviceId) !== 0
    );
  };

  const validateEdit = () => {
    return !!(updateData?.doctorId && updateData?.doctor && updateData?.nroDoc);
  };

  const handleAdd = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderEventContent = (eventInfo) => {
    const date = new Date(
      eventInfo.event._instance.range.start
    ).toLocaleDateString();
    const backColor =
      updateData?.doctorId === eventInfo.event._def.extendedProps.doctorId
        ? "bg-sky-100/80 h-full text-sky-600 border border-sky-300 border-sky-300 p-2 rounded-md hover:bg-sky-300 !ring-0"
        : "bg-slate-100/80 hover:bg-slate-300 h-full text-slate-500 border border-slate-300 p-2 rounded-md !ring-0";
    return (
      <div
        className={
          eventInfo.backgroundColor === "green"
            ? "bg-green-100/90 hover:bg-green-300 h-full text-green-600 border border-green-300 p-2 rounded-md !ring-0"
            : backColor
        }
      >
        <p className="font-bold">{date}</p>
        <p className="font-bold">{eventInfo.timeText}</p>
        <p className=" font-bold uppercase">{eventInfo.event.title}</p>
        <p className="text-stone-800 text-xs">
          {eventInfo.event._def.extendedProps.campusName}
        </p>
        <p className="text-stone-800 text-xs">
          {eventInfo.event._def.extendedProps.spuName}
        </p>
        <p className="text-stone-800 text-xs">
          {eventInfo.event._def.extendedProps.serviceName}
        </p>
        <p className="text-stone-800 text-xs">
          {eventInfo.event._def.extendedProps.consultingRoomName}
        </p>
      </div>
    );
  };

  const handleDateSelect = (selectInfo) => {
    const calendarApi = selectInfo.view.calendar;
    if (!validateSelect()) {
      calendarApi.unselect();
      setIsModalOpen(false);
      return;
    }
    setNewId(newId + 1);
    setOptions(0);
    const title = updateData?.doctor;
    const newAdd = {
      idDni: newId,
      title,
      doctor: updateData?.doctor,
      spuName,
      consultingRoomName,
      serviceName,
      backgroundColor: "green",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      filter: new Date(selectInfo.startStr),
      endHour: String(selectInfo.endStr).slice(11, 19),
      startHour: String(selectInfo.startStr).slice(11, 19),
      allDay: selectInfo.allDay,
      date: selectInfo.start,
      campusName,
      create: true,
    };
    setShowData(newAdd);
    setIsModalOpen(true);
    setAddData([...addData, newAdd]);
    calendarApi.addEvent(newAdd);
    setEditData(newAdd);
  };

  const handleDelete = ({ clickInfo }) => {
    onSubmitDelete(clickInfo.event._def.extendedProps.scheduleId);
    clickInfo.event.remove();
  };

  const handleEventClick = (clickInfo) => {
    setIsModalOpen(true);
    const data = clickInfo.event._def.extendedProps;
    setOptions(1);
    setShowData(data);
    setClickInfo(clickInfo);
    /* if (updateData?.editMode) {
      if (clickInfo.event.extendedProps.doctor === updateData?.doctor) {
        if (window.confirm('¿Seguro que deseas eliminar este evento?')) {
          onSubmitDelete(clickInfo.event._def.extendedProps.scheduleId)
          clickInfo.event.remove()
        }
      }
    } else {
      if (clickInfo.event.extendedProps.doctor === updateData?.doctor) {
        if (window.confirm('¿Seguro que deseas eliminar este evento?')) {
          const nuevoArray = allSchedule.filter((elem) => elem.idDni !== clickInfo.event._def.extendedProps.idDni)
          setAllSchedule(nuevoArray)
          clickInfo.event.remove()
        }
      } else {
        alert('Evento no editable')
      }
    } */
  };

  const eventAllow = (dropInfo, draggedEvent) => {
    if (
      !!updateData?.editMode &&
      draggedEvent._def.extendedProps.doctor ===
        updateData?.doctor /*  && draggedEvent.backgroundColor === 'blue' */
    ) {
      return true;
    } else if (
      draggedEvent._def.extendedProps.doctor === updateData?.doctor &&
      draggedEvent.backgroundColor === "green"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEventResize = (resizeInfo) => {
    const { event } = resizeInfo;
    const newEventDuration = resizeInfo.event.end - resizeInfo.event.start;
    let updatedEvent = null; // Variable para realizar un seguimiento del objeto modificado
    allSchedule.forEach((item) => {
      if (
        item.scheduleId === event._def.extendedProps.scheduleId ||
        new Date(item.start).getTime() === event.start.getTime()
      ) {
        const newStart = new Date(resizeInfo.event.start);
        const newEnd = new Date(
          resizeInfo.event.start.getTime() + newEventDuration
        );
        const updatedItem = {
          ...item,
          scheduleId: updateData?.editMode
            ? event._def.extendedProps.scheduleId
            : "",
          idDni: event._def.extendedProps.idDni,
          date: new Date(event.startStr),
          filter: new Date(event.start),
          start: String(newStart).slice(16, 24),
          end: String(newEnd).slice(16, 24),
          startHour: String(newStart).slice(16, 24),
          endHour: String(newEnd).slice(16, 24),
          event,
        };
        updatedEvent = updatedItem; // Actualiza la variable con el objeto modificado
      }
    }); // Devuelve el objeto modificado
    setOptions(1);
    setIsModalOpen(true);
    setShowData(updatedEvent);
    addSchedule(updatedEvent); // Actualiza el estado con el objeto modificado
    const deleteD = agruparEventos(eventData, {
      ...resizeInfo.oldEvent._def.extendedProps,
      date: resizeInfo.oldEvent.startStr,
    });
    setDeleteData(deleteD);
  };

  const handleEventDrop = (dropInfo) => {
    const { event } = dropInfo;
    const newStart = new Date(event.startStr);
    const newEndC = new Date(event.endStr);
    let updatedEvent = null;
    allSchedule.forEach((item) => {
      if (
        item.scheduleId === event._def.extendedProps.scheduleId ||
        new Date(item.start).getTime() === event.start.getTime()
      ) {
        const updatedItem = {
          ...item,
          scheduleId: event._def.extendedProps.scheduleId,
          idDni: event._def.extendedProps.idDni,
          date: newStart,
          filter: new Date(event.startStr),
          start: String(newStart).slice(16, 24),
          end: String(newEndC).slice(16, 24),
          startHour: String(newStart).slice(16, 24),
          endHour: String(newEndC).slice(16, 24),
          event,
        };
        updatedEvent = updatedItem;
      }
    });
    setOptions(1);
    setIsModalOpen(true);
    setShowData(updatedEvent);
    addSchedule(updatedEvent);
    const deleteD = agruparEventos(eventData, {
      ...dropInfo.oldEvent._def.extendedProps,
      date: dropInfo.oldEvent.startStr,
    });
    setDeleteData(deleteD);
  };

  const customButtons = {
    editButton: {
      text: "Editar",
      click: () => {
        handleEditButtonClick();
        setEditMode(updateData);
        setAllSchedule(filterDatos);
      },
      bootstrapFontAwesome: "fa-pencil",
    },
    myCustomButtonPrev: {
      text: "Prev",
      icon: "chevron-left",
      click: () => {
        handlePrevButtonClick();
        const api = calendarRef.current.getApi();
        api.prev();
      },
    },
    myCustomButtonNext: {
      text: "Next",
      icon: "chevron-right",
      click: () => {
        handleNextButtonClick();
        const api = calendarRef.current.getApi();
        api.next();
      },
    },
    updateButton: {
      text: "Guardar",
      click: function () {
        onSubmitSchedule();
        handleUpdateButtonClick();
      },
    },
    exportButton: {
      text: "Exportar",
      click: function () {
        console.log("estoy funcionando 3");
      },
    },
  };

  const [isEditButtonActive, setIsEditButtonActive] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditButtonActive(!isEditButtonActive);
    const editButton = document.querySelector(".fc-editButton-button");
    const updateButton = document.querySelector(".fc-updateButton-button");
    updateButton.classList.remove("fc-button-active");
    if (isEditButtonActive) {
      editButton.classList.remove("fc-button-active");
    } else {
      editButton.classList.add("fc-button-active");
    }
  };

  const handleUpdateButtonClick = () => {
    const editButton = document.querySelector(".fc-editButton-button");
    editButton.classList.remove("fc-button-active");
    setIsEditButtonActive(false);
  };

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        firstDay={1}
        allDaySlot={false}
        locale="es"
        slotMinTime="07:00:00"
        slotMaxTime="20:00:00"
        expandRows
        resources={filterDatos}
        selectMirror={!updateData?.editMode}
        editable={!!updateData?.doctor && validateEdit()}
        selectable={
          !!updateData?.doctor && validateEdit() && !updateData?.editMode
        }
        initialView="timeGridWeek"
        slotDuration="00:30:00"
        slotLabelInterval="00:30:00"
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        events={filterDatos}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventAllow={eventAllow}
        eventContent={renderEventContent}
        eventResize={handleEventResize}
        eventDrop={handleEventDrop}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        }}
        buttonText={{
          day: "Vista día",
          week: "Vista semana",
          list: "Listar semana",
          today: "Hoy",
        }}
        headerToolbar={{
          left: "title",
          right:
            "editButton,updateButton exportButton timeGridWeek,timeGridDay,listWeek",
        }}
        views={{
          listweek: { buttonText: "list week" },
          dayGridMonth: {
            titleFormat: { year: "numeric", month: "long", day: "numeric" },
          },
        }}
      />
      {isModalOpen && (
        <Modal
          addData={addData}
          options={options}
          showData={showData}
          control={control}
          isModalOpen={isModalOpen}
          title="Agregar observaciones"
          handleAdd={handleAdd}
          handleCancel={handleCancel}
          updateData={updateData}
          handleConsutingId={handleConsutingId}
          handleNote={handleNote}
          clickInfo={clickInfo}
          consultingRoomId={consultingRoomId}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}
