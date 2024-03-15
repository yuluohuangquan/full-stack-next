import pool from '@/utils/db';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getUsers(req, res);
        case 'POST':
            return addUser(req, res);
        // 添加其它方法的处理逻辑（PUT、DELETE）
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
