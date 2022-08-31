/**
 * @generated SignedSource<<8089b76f55b162ea06889883df7f0397>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchSeriesShareTwitterButtonFragment$data = {
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "SearchSeriesShareTwitterButtonFragment";
};
export type SearchSeriesShareTwitterButtonFragment$key = {
  readonly " $data"?: SearchSeriesShareTwitterButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchSeriesShareTwitterButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchSeriesShareTwitterButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "cdafaf49222295b08919c72beaf82918";

export default node;
