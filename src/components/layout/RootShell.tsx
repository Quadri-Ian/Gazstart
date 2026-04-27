import RootHeader from "@/components/layout/RootHeader";
import RootHero from "@/components/layout/RootHero";
import RootFooter from "@/components/layout/RootFooter";
import LegacyScriptExecutor from "@/components/layout/LegacyScriptExecutor";

type RootShellProps = {
  title: string;
  subtitle: string;
  legacyBodyHtml: string;
  routeKey?: string;
};

export default function RootShell({ title, subtitle, legacyBodyHtml, routeKey = "" }: RootShellProps) {
  return (
    <div className="min-h-screen bg-white text-[#394854]">
      <RootHeader />
      {routeKey === "" ? <RootHero title={title} subtitle={subtitle} routeKey={routeKey} /> : null}
      <main
        id="main-content"
        className="legacy-main"
        dangerouslySetInnerHTML={{ __html: legacyBodyHtml }}
      />
      <LegacyScriptExecutor routeKey={routeKey} legacyBodyHtml={legacyBodyHtml} />
      <RootFooter />
    </div>
  );
}
