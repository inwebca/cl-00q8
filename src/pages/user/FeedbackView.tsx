import Typography from "@mui/material/Typography";
import { FormContainer, TextareaAutosizeElement } from "react-hook-form-mui";
import { Button, Stack } from "@mui/material";
import { supabase } from "../../utils/supabase.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import DOMPurify from "dompurify";

type FormProps = {
  content: string;
};

const FeedbackView = () => {
  const { user } = useAuth();
  const defaultValues: FormProps = { content: "" };

  const onSubmit = async (data: FormProps) => {
    //prévenir l'injection XSS, sanitize le contenu
    const sanitizedContent = DOMPurify.sanitize(data.content);

    const res = await supabase.from("feedback").insert({
      content: sanitizedContent,
      user_id: user?.id,
    });

    if (res.error) {
      console.error("Error :", res.error.message);
    } else {
      console.log("send");
    }
  };
  return (
    <>
      <Typography typography="h5" sx={{ mt: 2, mb: 2 }}>
        Send App Feedback
      </Typography>

      <FormContainer defaultValues={defaultValues} onSuccess={onSubmit}>
        <Stack direction={"column"} gap={2}>
          <TextareaAutosizeElement
            name={"content"}
            label={"Write something"}
            required
          />
          <Button variant="contained" type="submit">
            Send Feedback
          </Button>
        </Stack>
      </FormContainer>
    </>
  );
};

export default FeedbackView;
