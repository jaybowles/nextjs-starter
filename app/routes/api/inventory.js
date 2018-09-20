import { Router } from 'express';
import Eos from 'eosjs';

const router = Router();
const eos = Eos();

const STATIC_DATA = [
  {
    id: '1',
    name: 'Thing A',
    details: 'You definitely need this!'
  }
];

router.get('/:user', (req, res) => {
  const { user } = req.params;

  eos
    .getTableRows({
      json: true,
      code: 'eosio.nft', // Contract who owns the table
      scope: 'eosio.nft', // Scope of the table
      table: 'token'
    })
    .then(({ rows }) => {
      const result = rows.filter(row => row.owner === user).map(row => {
        const temp = JSON.parse(row.uri);
        return {
          id: row.id,
          owner: row.owner,
          name: row.name,
          temp
        };
      });
      res.json(result);
    });
});

export default router;
