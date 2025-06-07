import React, { use, useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import api from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const app = document.querySelector(".main-content")
    if (!app) return
    const handleScroll = () => {
      if (loading || !hasMore) return
      const scrollY = app.scrollTop;
      const innerHeight = app.clientHeight
      const scrollHeight = app.scrollHeight;

      if (scrollY + innerHeight >= scrollHeight - 100) {
        setLoading(true);
        setPage((prev) => prev + 1)
      }
    }

    app.addEventListener("scroll", handleScroll);
    return () => app.removeEventListener("scroll", handleScroll);
  }, [loading])


  useEffect(() => {
    const fetch = async () => {
      try {
        console.log("Fetching...");
        const data = await api.get(`/module_mobile_api.php?beginning_date=${start}&ending_date=${end}&page=${page}`)
        const response = data.data.events
        if (response.length === 0) {
          setHasMore(false);
        }
        let gotEvent = [...events]
        gotEvent.push(...response)
        setEvents(gotEvent);
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    fetch();
  }, [page])

  useEffect(() => {
    const fetch = async () => {
      try {
        setPage(1);
        const data = await api.get(`/module_mobile_api.php?beginning_date=${start}&ending_date=${end}&page=${page}`)
        setEvents(data.data.events);
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    fetch();
  }, [start, end])

  return (
    <div>
      <div className="date-filter">
        <input type="date" name="start" value={start} onChange={(e) => setStart(e.target.value)} id="" />
        <input type="date" name="end" value={end} onChange={(e) => setEnd(e.target.value)} id="" />
      </div>
      <div className="card-container">
        {events?.map((e) => {
          return (
            <EventCard key={e.id} image={e.image} title={e.title} date={e.date} />
          )
        })}
      </div>
    </div>
  )
}

export default Events