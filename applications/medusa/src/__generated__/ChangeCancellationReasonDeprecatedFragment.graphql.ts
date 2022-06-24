/**
 * @generated SignedSource<<d1005aaa70d253cc54be83fb681182b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCancellationReasonDeprecatedFragment$data = {
  readonly deprecated: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCancellationReasonDeprecatedFormFragment">;
  readonly " $fragmentType": "ChangeCancellationReasonDeprecatedFragment";
};
export type ChangeCancellationReasonDeprecatedFragment$key = {
  readonly " $data"?: ChangeCancellationReasonDeprecatedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCancellationReasonDeprecatedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCancellationReasonDeprecatedFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deprecated",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeCancellationReasonDeprecatedFormFragment"
    }
  ],
  "type": "CancellationReason",
  "abstractKey": null
};

(node as any).hash = "cc3ca17f5e543106ac601d1af5483796";

export default node;
