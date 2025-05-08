import { Button } from '@mui/material';
const LevelButton = ({ level }: { level: any }) => {
    return (
        <Button variant="outlined" size="small">
            {level.name}
        </Button>
    );
};

export default LevelButton;