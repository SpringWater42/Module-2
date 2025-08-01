import { getPerformance, postPerformance, updatePerformance, deletePerformance } from '../model/performanceDB.js';

export const getPerformanceCon = async (req, res) => {
  try {
    const performance = await getPerformance();
    res.json({ performance });
  } catch (error) {
    console.error('Error fetching performance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const postPerformanceCon = async (req, res) => {
  try {
    const { employeeId, rating, description, review_month } = req.body;
    if (
      employeeId === undefined ||
      rating === undefined ||
      !description ||
      !review_month
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    await postPerformance(Number(employeeId), Number(rating), description, review_month);
    res.status(201).json({ message: 'Performance record added successfully' });
  } catch (error) {
    console.error('Error posting performance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePerformanceCon = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId, rating, description, review_month } = req.body;

    if (
      !id ||
      employeeId === undefined ||
      rating === undefined ||
      !description ||
      !review_month
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await updatePerformance(Number(id), Number(employeeId), Number(rating), description, review_month);
    res.json({ message: 'Performance record updated successfully' });
  } catch (error) {
    console.error('Error updating performance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deletePerformanceCon = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePerformance(id);
    res.status(200).json({ message: 'Performance record deleted.' });
  } catch (error) {
    console.error('Error deleting performance:', error);
    res.status(500).json({ error: 'Failed to delete performance.' });
  }
};
