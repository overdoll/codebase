/**
 * @generated SignedSource<<d06e65d550bfe8b99eece657e3edf924>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostVideoMediaFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ControlledVideoFragment">;
  readonly " $fragmentType": "PostVideoMediaFragment";
};
export type PostVideoMediaFragment$key = {
  readonly " $data"?: PostVideoMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostVideoMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostVideoMediaFragment",
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
      "name": "ControlledVideoFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "55c51517e444adc9a2e321b9c3bc102f";

export default node;
