import { useAuth } from "../context/AuthContext";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 p-8">
      <Container maxWidth="lg" className="text-white">
        <div className="flex justify-between items-center mb-8">
          <Typography variant="h3" fontWeight="bold">
            Dashboard
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={logout}
            sx={{ textTransform: "none" }}
          >
            Logout
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Card className="bg-white text-black shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                className="font-bold mb-4"
              >
                Estadísticas
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                facilis iusto autem ullam aliquid laborum, qui architecto nam
                ...
              </Typography>
            </CardContent>
          </Card>
          <Card className="bg-white text-black shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                className="font-bold mb-4"
              >
                Tareas Pendientes
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                facilis iusto autem ullam aliquid laborum, qui architecto nam
                ...
              </Typography>
            </CardContent>
          </Card>
          <Card className="bg-white text-black shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                className="font-bold mb-4"
              >
                Configuración
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                facilis iusto autem ullam aliquid laborum, qui architecto nam
                ...
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
