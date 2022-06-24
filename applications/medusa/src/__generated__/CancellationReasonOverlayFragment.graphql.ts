/**
 * @generated SignedSource<<1b6b79651dd361ca5b1bb1c850b3f2db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CancellationReasonOverlayFragment$data = {
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "CancellationReasonOverlayFragment";
};
export type CancellationReasonOverlayFragment$key = {
  readonly " $data"?: CancellationReasonOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CancellationReasonOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CancellationReasonOverlayFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "CancellationReason",
  "abstractKey": null
};

(node as any).hash = "1d9ef39bcf291df7944df9ce05c6867b";

export default node;
