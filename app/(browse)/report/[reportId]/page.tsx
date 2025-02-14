import { getAnalyticsById } from '@/lib/file-service'
import { TableComplex } from '@/app/(browse)/report/[reportId]/_components/table-complex'
import { TableSimple } from '@/app/(browse)/report/[reportId]/_components/table'
import { PieChartComponent } from './_components/pie-chart-component'
import { BarChartComponent } from '@/app/(browse)/report/[reportId]/_components/bar-chart-component'
import { LineChartComponent } from '@/app/(browse)/report/[reportId]/_components/line-chart-component'
import { ChartWrapper } from '@/app/(browse)/report/[reportId]/_components/chart-wrapper'

const ReportId = async ({ params }: { params: { reportId: string } }) => {
    const analysis = await getAnalyticsById(params.reportId)

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Rent Supplement Analysis</h1>
            <div className="space-y-8">
                {/* 1️⃣ 柱状图 - Rent Supplement Program 统计 */}
                <ChartWrapper title="Rent Supplement Program Stats">
                    <BarChartComponent
                        data={analysis.programStats ?? {}}
                        xLabel="Program"
                        yLabel="Requests"
                    />
                </ChartWrapper>

                {/* 2️⃣ 饼图 - 按 Program 统计总补贴金额 */}
                <ChartWrapper title="Program Subsidy Amounts">
                    <PieChartComponent data={analysis.programAmountStats ?? {}} />
                </ChartWrapper>

                {/* 3️⃣ 折线图 - 补贴发放时间趋势 */}
                <ChartWrapper title="Subsidy Distribution Over Time">
                    <LineChartComponent
                        data={analysis.dateStats ?? {}}
                        xLabel="Date"
                        yLabel="Total Amount"
                    />
                </ChartWrapper>
            </div>
            <div className="space-y-8">
                {/* 1️⃣ 统计不同 Rent Supplement Program 的申请次数 */}
                <TableSimple
                    title="Rent Supplement Program Stats"
                    data={analysis.programStats ?? {}}
                    headers={['Program', 'Requests']}
                />

                {/* 2️⃣ 按 Program 统计总补贴金额 */}
                <TableSimple
                    title="Program Subsidy Amounts"
                    data={analysis.programAmountStats ?? {}}
                    headers={['Program', 'Total Amount']}
                />

                {/* 3️⃣ 按 Individual 统计总申请次数 & 总金额 */}
                <TableComplex
                    title="Individual Stats"
                    data={analysis.individualStats ?? {}}
                    headers={['Individual', 'Requests', 'Total Amount']}
                />

                {/* 4️⃣ 按 File ID 统计补贴总额 */}
                <TableSimple
                    title="File Stats (Total Subsidy per File)"
                    data={analysis.fileStats ?? {}}
                    headers={['File ID', 'Total Amount']}
                />

                {/* 5️⃣ 按 Date 统计补贴发放情况 */}
                <TableSimple
                    title="Subsidy Distribution Over Time"
                    data={analysis.dateStats ?? {}}
                    headers={['Date', 'Total Amount']}
                />
            </div>
        </div>
    )
}

export default ReportId
