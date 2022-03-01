/**
 * @generated SignedSource<<4b493b8eea351b6801036cc9eafde09e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminRevokeModeratorButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "AdminRevokeModeratorButtonFragment";
};
export type AdminRevokeModeratorButtonFragment = AdminRevokeModeratorButtonFragment$data;
export type AdminRevokeModeratorButtonFragment$key = {
  readonly " $data"?: AdminRevokeModeratorButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminRevokeModeratorButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminRevokeModeratorButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "d7f2096abebcbffe7be9525b48f4fd69";

export default node;
