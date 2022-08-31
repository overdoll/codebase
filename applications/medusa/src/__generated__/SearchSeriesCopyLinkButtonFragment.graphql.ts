/**
 * @generated SignedSource<<fc4364eec5c10a4b3f5c4e84793d8b81>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchSeriesCopyLinkButtonFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "SearchSeriesCopyLinkButtonFragment";
};
export type SearchSeriesCopyLinkButtonFragment$key = {
  readonly " $data"?: SearchSeriesCopyLinkButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchSeriesCopyLinkButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchSeriesCopyLinkButtonFragment",
  "selections": [
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

(node as any).hash = "01a38042e5cef8bc6502d31b26af982c";

export default node;
