import {Reading} from '../models/reading.model';
import {Injectable} from '@angular/core';
import {Customer} from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  downloadJson(customers: Customer[], readings: Reading[]): void {
    const content = JSON.stringify({ customers, readings }, null, 2);
    this.download('hausverwaltung.json', content, 'application/json');
  }

  downloadCsv(readings: Reading[]): void {
    const rows = [
      'id;customerId;dateOfReading;meterId;meterCount;kindOfMeter;substitute;comment',
      ...readings.map(r => [
        r.id || r.uuid || '',
        r.customer?.id || r.customer?.uuid || '',
        r.dateOfReading,
        r.meterId,
        r.meterCount,
        r.kindOfMeter,
        r.substitute,
        r.comment ?? ''
      ].join(';'))
    ];

    this.download('ablesungen.csv', rows.join('\n'), 'text/csv');
  }

  downloadXml(customers: Customer[], readings: Reading[]): void {
    const xml = `
<hausverwaltung>
  <customers>
${customers.map(c => `    <customer id="${c.id || c.uuid || ''}">
      <firstName>${c.firstName}</firstName>
      <lastName>${c.lastName}</lastName>
      <birthDate>${c.birthDate ?? ''}</birthDate>
      <gender>${c.gender}</gender>
    </customer>`).join('\n')}
  </customers>
  <readings>
${readings.map(r => `    <reading id="${r.id || r.uuid || ''}">
      <customerId>${r.customer?.id || r.customer?.uuid || ''}</customerId>
      <dateOfReading>${r.dateOfReading}</dateOfReading>
      <meterId>${r.meterId}</meterId>
      <meterCount>${r.meterCount}</meterCount>
      <kindOfMeter>${r.kindOfMeter}</kindOfMeter>
      <substitute>${r.substitute}</substitute>
      <comment>${r.comment ?? ''}</comment>
    </reading>`).join('\n')}
  </readings>
</hausverwaltung>`.trim();

    this.download('hausverwaltung.xml', xml, 'application/xml');
  }

  private download(filename: string, content: string, type: string): void {
    const blob = new Blob([content], { type: `${type};charset=utf-8` });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }
}
