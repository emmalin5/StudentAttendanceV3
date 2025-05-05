const Class = require('../models/Class');

exports.validateSchedule = async (req, res, next) => {
  const { classId, subjectId } = req.body;

  if (!classId || !subjectId) {
    return res.status(400).json({ error: 'Class ID and Subject ID are required' });
  }

  try {
    const classDoc = await Class.findById(classId).populate('schedule.subject');
    if (!classDoc) {
      return res.status(404).json({ error: 'Class not found' });
    }

    const now = new Date();
    const currentDay = now.getDay(); // 0=Sunday, 6=Saturday
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const gracePeriod = parseInt(process.env.GRACE_PERIOD) || 10; // Default 10 minutes

    // Find all schedule entries for this subject today
    const validSchedule = classDoc.schedule.some(entry => {
      if (!entry.subject._id.equals(subjectId)) return false;
      if (entry.dayOfWeek !== currentDay) return false;

      const parseTime = (timeStr) => {
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
      };

      const start = parseTime(entry.startTime) - gracePeriod;
      const end = parseTime(entry.endTime) + gracePeriod;

      return currentMinutes >= start && currentMinutes <= end;
    });

    if (!validSchedule) {
      return res.status(403).json({
        error: 'Attendance outside scheduled time',
        currentTime: now.toLocaleTimeString(),
        allowedTimes: classDoc.schedule
          .filter(s => s.subject._id.equals(subjectId))
          .map(s => ({
            day: s.dayOfWeek,
            start: s.startTime,
            end: s.endTime
          }))
      });
    }

    next();

  } catch (error) {
    console.error('Schedule validation error:', error);
    res.status(500).json({ error: 'Schedule validation failed' });
  }
};