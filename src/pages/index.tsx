import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  List,
  ListItem,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import CreateNewModal from 'components/CreateNewModal';
import Menu from 'components/Menu';

interface Card {
  id: number;
  title: string;
  description: string;
  template: string;
}

const data: Card[] = [
  {
    id: 1,
    title: 'Item 1',
    template: 'template 1',
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Possimus nam at dicta autem aliquam, dolore adipisci explicabo natus dolor nemo.`,
  },
  {
    id: 2,
    title: 'Item 2',
    template: 'template 2',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    id: 3,
    title: 'Item 3',
    template: 'template 3',
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Dolore, magni. Deserunt magnam, consectetur accusantium vel dolor,
    soluta id dignissimos rerum laborum ipsa saepe atque,
    aperiam omnis officia error cumque consequatur sit explicabo quam sunt?
    Nulla, animi ullam! Accusamus, totam perspiciatis.
    Quasi necessitatibus quia sed corrupti, quas repellat magni. Quibusdam, illum!`,
  },
];

const sortOptions = [
  {
    value: 'title',
    label: 'Title (A-Z)',
  },
  {
    value: '-title',
    label: 'Title (Z-A)',
  },
];

const HomePage: React.FC = () => {
  const [order, setOrder] = useState(sortOptions[0].value);

  const handleSortChange = (e: SelectChangeEvent) => {
    setOrder(e.target.value as string);
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <CreateNewModal />
      </Box>

      <Container maxWidth="sm">
        <Box display="flex" justifyContent="space-between" py={4}>
          <TextField label="Search" variant="filled" />

          <Select
            value={order}
            onChange={handleSortChange}
          >
            {sortOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </Select>
        </Box>

        <List>
          {data.map((card) => (
            <ListItem key={card.id} disableGutters>
              <Card sx={{
                width: '100%',
              }}
              >
                <CardActionArea component={Link} to="/">
                  <CardHeader
                    title={card.title}
                    subheader={card.template}
                    action={<Menu />}
                  />

                  <CardContent>
                    <Typography noWrap>
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ListItem>
          ))}
        </List>

        <Pagination
          count={5}
          sx={{
            my: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      </Container>
    </>
  );
};

export default HomePage;
