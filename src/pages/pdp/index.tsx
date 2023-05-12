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

import { usePDPForms } from 'api/pdpForms';

import AssignModal from 'components/PDPForms/AssignModal';
import Menu from 'components/PDPForms/Menu';

interface Card {
  id: string;
  title: string;
  description: string;
  template: string;
}

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

const PDPPage: React.FC = () => {
  const [order, setOrder] = useState(sortOptions[0].value);

  const {
    data,
    isLoading,
    isIdle,
    isError,
  } = usePDPForms();

  if (isLoading || isIdle) {
    return (
      <>
        Loading..
      </>
    );
  }

  if (isError) {
    return (
      <>
        Error
      </>
    );
  }

  const handleSortChange = (e: SelectChangeEvent) => {
    setOrder(e.target.value as string);
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <AssignModal />
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
          {data.map((pdpForm) => (
            <ListItem key={pdpForm.userId} disableGutters>
              <Card sx={{
                width: '100%',
              }}
              >
                <CardActionArea component={Link} to={`/pdp/${pdpForm.id}`}>
                  <CardHeader
                    title={pdpForm.type}
                    subheader={pdpForm.level}
                    action={<Menu />}
                  />

                  {/* <CardContent>
                    <Typography noWrap>
                      {pdpForm.description}
                    </Typography>
                  </CardContent> */}
                </CardActionArea>
              </Card>
            </ListItem>
          ))}
        </List>

        <Pagination
          count={Math.ceil(data.length / 5)}
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

export default PDPPage;
