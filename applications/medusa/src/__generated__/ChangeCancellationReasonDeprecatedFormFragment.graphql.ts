/**
 * @generated SignedSource<<849fc12efda2b561ea59c197de08cdfd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCancellationReasonDeprecatedFormFragment$data = {
  readonly id: string;
  readonly deprecated: boolean;
  readonly " $fragmentType": "ChangeCancellationReasonDeprecatedFormFragment";
};
export type ChangeCancellationReasonDeprecatedFormFragment = ChangeCancellationReasonDeprecatedFormFragment$data;
export type ChangeCancellationReasonDeprecatedFormFragment$key = {
  readonly " $data"?: ChangeCancellationReasonDeprecatedFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCancellationReasonDeprecatedFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCancellationReasonDeprecatedFormFragment",
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
      "name": "deprecated",
      "storageKey": null
    }
  ],
  "type": "CancellationReason",
  "abstractKey": null
};

(node as any).hash = "f13c86dc185025caa3d5a61252ca9504";

export default node;
