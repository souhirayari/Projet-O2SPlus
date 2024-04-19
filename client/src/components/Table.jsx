import React, { useState } from "react";

const Table = ({ columns, data }) => {
	const [detailsVisible, setDetailsVisible] = useState(null);

	return (
		<div className="font-roboto overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div className="inline-block min-w-full sm:px-6 lg:px-8">
				<div className="overflow-hidden">
					<table className="min-w-full mb-0">
						<thead className="border-b rounded-t-lg text-center bg-gray-200">
							<tr>
								{columns.map((column, index) => (
									<th
										key={index}
										className="font-roboto text-blackColor px-6 py-4"
									>
										{column}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((row, rowIndex) => (
								<React.Fragment key={rowIndex}>
									<tr className="border-b hover:bg-gray-300 cursor-pointer">
										{row.map((cell, cellIndex) => (
											<td
												key={cellIndex}
												className="text-sm text-center px-6 py-4 whitespace-nowrap text-blackColor"
											>
												{cell}
											</td>
										))}
									</tr>
								</React.Fragment>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Table;
