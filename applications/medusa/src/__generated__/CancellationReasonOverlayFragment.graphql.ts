/**
 * @generated SignedSource<<3db9bca50369b771b01d0dd6ce5baaa5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CancellationReasonOverlayFragment$data = {
  readonly title: string;
  readonly " $fragmentType": "CancellationReasonOverlayFragment";
};
export type CancellationReasonOverlayFragment = CancellationReasonOverlayFragment$data;
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
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "CancellationReason",
  "abstractKey": null
};

(node as any).hash = "5ffbefa1cdcd5e2310d5b4b5c9b7891c";

export default node;
