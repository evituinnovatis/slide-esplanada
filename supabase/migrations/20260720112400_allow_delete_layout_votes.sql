-- RPC segura para limpar votos: exige JWT authenticated com app_metadata.role = 'presenter'.
CREATE OR REPLACE FUNCTION public.clear_layout_votes()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  IF coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') <> 'presenter' THEN
    RAISE EXCEPTION 'Acesso negado: apenas apresentadores podem limpar votos';
  END IF;

  DELETE FROM public.layout_votes
  WHERE id IS NOT NULL;
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

REVOKE ALL ON FUNCTION public.clear_layout_votes() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.clear_layout_votes() TO authenticated;
