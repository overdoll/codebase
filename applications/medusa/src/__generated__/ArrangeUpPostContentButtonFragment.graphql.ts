/**
 * @generated SignedSource<<999a59b6a1ca96160d9f224a43a835b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeUpPostContentButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
  readonly " $fragmentType": "ArrangeUpPostContentButtonFragment";
};
export type ArrangeUpPostContentButtonFragment$key = {
  readonly " $data"?: ArrangeUpPostContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeUpPostContentButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeUpPostContentButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceInfoFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "76de4eb84510c8364b721d244e9b1442";

export default node;
