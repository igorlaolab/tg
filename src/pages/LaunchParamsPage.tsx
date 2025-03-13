import { useLaunchParams } from '@/hooks/useLaunchParams';
import { Page } from '@/components/Page.tsx';

interface Entry {
  key: string;
  value: string;
}

export function LaunchParamsPage() {
  const lp = useLaunchParams();
  const entries = Object.entries(lp).map<Entry>(([key, value]) => ({
    key,
    value: JSON.stringify(value, null, 2),
  }));

  return (
    <Page>
      <h4>Launch Parameters</h4>
      <p>This is a debug page showing the launch parameters passed to the application.</p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(({ key, value }) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <pre>{value}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}
