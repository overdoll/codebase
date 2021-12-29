/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateContentButtonFragment = {
    readonly id: string;
    readonly content: ReadonlyArray<{
        readonly urls: ReadonlyArray<{
            readonly url: string;
        }>;
    }>;
    readonly " $refType": "UpdateContentButtonFragment";
};
export type UpdateContentButtonFragment$data = UpdateContentButtonFragment;
export type UpdateContentButtonFragment$key = {
    readonly " $data"?: UpdateContentButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UpdateContentButtonFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdateContentButtonFragment",
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
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ResourceUrl",
          "kind": "LinkedField",
          "name": "urls",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'a97bbd6667189ae73fedfced3a359806';
export default node;
