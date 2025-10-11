'use client'
import Button from "@/ui/button";

export default function Home() {

  return (
    <div className="main-content">
        <h2>Novo</h2>
        <form>
            <label htmlFor="usuario">
              <p>Campo 1</p>
              <input className="login_input" type="text" name="usuario" placeholder="Campo 1"/>
            </label>

            <label htmlFor="senha" className="relative">
              <p>Campo 2</p>
              <input className="login_input" type='text' name="senha" placeholder="Campo 2"/>
            </label>

            <label htmlFor="senha" className="relative">
              <p>Campo 3</p>
              <input className="login_input" type='text' name="senha" placeholder="Campo 3"/>
            </label>

            <label htmlFor="senha" className="relative">
              <p>Campo 4</p>
              <input className="login_input" type='text' name="senha" placeholder="Campo 4"/>
            </label>
        </form>
      <Button>Cadastrar</Button>
    </div>
  );
}
